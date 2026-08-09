# Backend Architecture

This document describes the architecture of the Sharefolio REST API
(`backend/`). It is a Node.js + Express application that uses Sequelize as ORM
against a PostgreSQL database and exposes its API documentation via Swagger.

## Overview

```
        HTTP (port 4000)
              │
              ▼
        ┌─────────────┐
        │   index.js   │  Express app: middleware, wiring, boot
        └──────┬───────┘
               │
   ┌───────────┼───────────────┐
   │           │               │
   ▼           ▼               ▼
 ┌──────┐   ┌───────┐       ┌────────────┐
 │ auth │   │ users │       │ projects   │   Router layer (routes/)
 └──┬───┘   └───┬───┘       └─────┬──────┘
   │           │                 │
   ▼           ▼                 ▼
 ┌──────────┐ ┌──────────┐   ┌─────────────┐
 │ auth     │ │ user     │   │ project     │   Controller layer (controllers/)
 │ controller│ │ controller│  │ controller  │
 └────┬─────┘ └────┬─────┘   └──────┬──────┘
      │           │                │
      └───────────┴───────┬────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Sequelize models │   Model layer (models/)
                 │  Account/Project │
                 │  /EnumCategory   │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │    PostgreSQL    │   database (Postgres 17)
                 └──────────────────┘
```

The API follows a classic **layered approach**:

- **Router layer** (`routes/`) — maps HTTP paths + methods to controller functions and defines OpenAPI (`@openapi`) annotations for Swagger.
- **Controller layer** (`controllers/`) — extracts request data, talks to the models, and shapes the HTTP responses.
- **Model layer** (`models/`) — Sequelize definitions that map to database tables.
- **DB layer** (`db/`) — the Sequelize connection (singleton).

## Directory Layout

```
backend/
├── index.js                 # Entry point: Express app, middleware, route wiring, boot
├── swagger.js               # OpenAPI definition, components/schemas, spec generation
├── db/
│   └── db.js                # Sequelize connection (reads DB_* env vars)
├── models/
│   ├── userModel.js         # Account (table `account`)
│   ├── projectModel.js      # Project (table `project`)
│   └── categoryModel.js     # EnumCategory (table `enum_category`)
├── controllers/
│   ├── userController.js
│   ├── projectController.js
│   └── authenticationController.js
├── routes/
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── authRoutes.js
└── Dockerfile               # Multi-stage: dev (nodemon) / prod (node)
```

## Entry Point (`index.js`)

Responsibilities, in order of execution:

1. **Create the Express app** and declare the global middleware:
   - `cors()` — allows cross-origin requests from the frontend
   - `bodyParser.json()` — parses JSON request bodies
2. **Connect to the database** via Sequelize (`authenticate()` + `sync({ force: false })`).
3. **Serve Swagger** at `/docs` (UI) and `/docs-json` (raw OpenAPI spec).
4. **Mount the routers** under their prefixes:
   - `/users` → `userRoutes`
   - `/auth` → `authRoutes`
   - `/projects` → `projectRoutes`
   - `/categories` → inline route (`EnumCategory.findAll()`)
5. **Start the server** on `PORT` (default 4000).

## Authentication

Auth is **stateless** — no session middleware. Login verifies credentials
against the database and returns the user record; the frontend keeps its own
cookie (`isLoggedIn`) with the user id.

- `POST /auth/login` takes `{ username, password }` (username **or** email),
  calls the PostgreSQL function `check_password(usr, pw)` via a raw query, and
  returns the user (without `password`) on success.
- Failed login → `401`, missing credentials → `400`.
- Password hashing/verification lives **in the database** (pgcrypto `crypt`,
  bcrypt blowfish). The account table has a `BEFORE INSERT OR UPDATE` trigger
  that hashes new passwords. The app never sees plain hashes.

## Router Layer (`routes/`)

Routers define paths and delegate to controllers. Each router carries OpenAPI
annotations in JSDoc form (tag `@openapi`), which `swagger-jsdoc` parses into
the spec served at `/docs`.

| Route | Method | Handler | Purpose |
| ----- | ------ | ------- | ------- |
| `/users` | GET | `getUsers` | List all users |
| `/users/:name` | GET | `getUser` | Get a user by username **or UUID** |
| `/users/:name/projects` | GET | `getUsersProjects` | Projects of a user (by name or UUID) |
| `/users/create` | POST | `createUser` | Create a user (JSON `{ userData }`) |
| `/projects` | GET | `getProjects` | List all projects |
| `/projects/:name` | GET | `getProjectByName` | Get a project by name (case-insensitive) |
| `/projects/create` | POST | `createProject` | Create a project (multipart: `pics[]` + `projectData` JSON string) |
| `/auth/login` | POST | `loginUser` | Log in (stateless, DB-verified) |
| `/auth/logout` | GET | `logoutUser` | Log out (no server state) |
| `/categories` | GET | inline | List categories |

Upload handling lives in the project router: `multer` with disk storage writes
project pictures to `../public/projects`.

## Controller Layer (`controllers/`)

Controllers contain the request/response logic. The general pattern:

```js
const handler = async (req, res, next) => {
    try {
        const result = await Model.findX(...);
        if (!result) res.status(404).json({ error: '...' });
        else res.status(200).json(result);
    } catch (error) {
        next(error); // central error middleware
    }
};
```

Controllers **do not** build SQL directly — they use Sequelize query methods
(`findAll`, `findOne`, `findByPk`, `create`) on the models. The only raw query
is `check_password` in the auth controller.

| Controller | Functions |
| ---------- | --------- |
| `userController.js` | `getUsers`, `getUser`, `getUsersProjects`, `createUser` |
| `projectController.js` | `getProjects`, `getProjectByName`, `createProject` |
| `authenticationController.js` | `loginUser`, `logoutUser` |

## Model Layer (`models/`)

Sequelize models mirror the database schema. All models set
`underscored: true`, so attribute `isAdmin` maps to the column `is_admin`
(camelCase → snake_case). The database uses snake_case consistently
(`is_admin`, `teaser_image`, `creator_id`, ...).

### Account (`userModel.js`)

Table: `account`. **`password` is excluded from the default scope**, so it is
never returned by `findAll`/`findOne` unless explicitly requested.

| Attribute | Type | Notes |
| --------- | ---- | ----- |
| `id` | UUID | PK, default `gen_random_uuid()` |
| `lastname` | STRING | required |
| `username` | STRING | required, unique |
| `email` | STRING | required, unique, isEmail |
| `password` | STRING | required, hashed by a **DB trigger** (pgcrypto) |
| `isAdmin` | BOOLEAN | default `false`, column `is_admin` |
| `firstname` | STRING | optional |
| `job` | STRING | optional |
| `location` | STRING | optional |
| `description` | TEXT | optional |
| `image` | STRING | default placeholder |

### Project (`projectModel.js`)

Table: `project`.

| Attribute | Type | Notes |
| --------- | ---- | ----- |
| `id` | UUID | PK, default `gen_random_uuid()` |
| `creator_id` | UUID | FK → `account.id` |
| `teaserImage` | STRING | default placeholder, column `teaser_image` |
| `name` | STRING | required |
| `description` | TEXT | optional |
| `kind` | STRING | required |
| `tools` | STRING | optional |
| `category_id` | INTEGER | FK → `enum_category.id` |
| `demo` | STRING | optional |
| `image1`, `image2` | STRING | placeholders |
| `contributors` | STRING | optional |

Associations:
- `Project.belongsTo(Account, { foreignKey: 'creator_id', as: 'creator' })`
- `Project.belongsTo(EnumCategory, { foreignKey: 'category_id', as: 'category' })`

### EnumCategory (`categoryModel.js`)

Table: `enum_category`. Simple `id` (integer, auto-increment) + `name`
(string, unique).

## DB Layer (`db/db.js`)

Creates a single Sequelize instance from environment variables:

| Env var | Default | Purpose |
| ------- | ------- | ------- |
| `DB_HOST` | `postgres` | Database host (service name in Docker) |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `sharefolio` | Database name |
| `DB_USER` | `web` | Database user |
| `DB_PASSWORD` | `web` | Database password |
| `DB_LOG` | `false` | Enable Sequelize SQL logging |

This lets the same image run in every environment (dev/staging/prod) without
code changes.

## Database (SQL in `../database/postgres`)

The schema is created from ordered SQL files during the Postgres image build
(`custom-entrypoint.sh`). Password hashing is enforced in the database:

- `00_domains.sql` — `D_UNTAINTED`, `D_EMAIL` check domains.
- `20_account.sql` — `account` table, `encrpyt_password_function` trigger
  (hashes `password` with `crypt(..., gen_salt('bf', 12))` on insert/change),
  `one_admin_exists` constraint trigger.
- `30_account_data.sql` — seed users (plaintext passwords, hashed on insert).
- `40_account_functions.sql` — `check_password(usr, pw)` used by `/auth/login`.
- `60/70_enum_category*.sql`, `80_project.sql`, `90_project_data.sql` — schema
  and seed data for categories and projects.

The legacy SQL REST layer (`rest_helper`, `post_account`, ...) has been
removed — the Express app talks to the database exclusively through Sequelize.

## Swagger (`swagger.js`)

- OpenAPI 3.0.0 spec generated from `routes/*.js` JSDoc annotations.
- `components.schemas` define the shared shapes: `User`, `UserCreate`,
  `LoginCredentials`, `Project`, `ProjectCreate`, `Category`, `Error`.
- Routes reference these schemas via `$ref` instead of inlining them.
- The primary server URL is configurable via `SWAGGER_SERVER_URL` /
  `SWAGGER_SERVER_DESCRIPTION` (set per environment in Docker Compose).
- Served at `/docs` (Swagger UI) and `/docs-json` (raw spec).

## Docker

`Dockerfile` uses `node:24-alpine` with two targets (see the root
`docker-compose.yml` for how environments select a target):

| Target | Command | Use |
| ------ | ------- | --- |
| `dev` | `npm run dev` (nodemon, live reload) | development / staging |
| `prod` | `npm run run` (plain `node index.js`) | production |

`docker-compose.yml` sets `DB_*`, `SWAGGER_SERVER_URL` and
`SWAGGER_SERVER_DESCRIPTION` per environment.
