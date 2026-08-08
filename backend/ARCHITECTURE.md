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
   - `/categories` → inline route
5. **Start the server** on port 4000.

> **Note:** The Passport / cookie-session middleware and the local strategy are
> currently commented out (auth is work-in-progress). See "Known Issues".

## Router Layer (`routes/`)

Routers define paths and delegate to controllers. Each router carries OpenAPI
annotations in JSDoc form (tag `@openapi`), which `swagger-jsdoc` parses into
the spec served at `/docs`.

| Route | Method | Handler | Purpose |
| ----- | ------ | ------- | ------- |
| `/users` | GET | `getUsers` | List all users |
| `/users/:name` | GET | `getUserByName` | Get a user by username |
| `/users/:name/projects` | GET | `getUsersProjects` | Projects of a user |
| `/users/:id` | GET | `getUserById` | Get a user by UUID |
| `/users/create` | POST | `createUser` | Create a user (multipart, optional profile pic) |
| `/projects` | GET | `getProjects` | List all projects |
| `/projects/:name` | GET | `getProjectByName` | Get a project by name (case-insensitive) |
| `/projects/create` | POST | `createProject` | Create a project (multipart, `pics[]`) |
| `/auth/login` | POST | `loginUser` | Log in (Passport local) |
| `/auth/logout` | GET | `logoutUser` | Log out |
| `/categories` | GET | inline | List categories |

Upload handling lives in the routers: `multer` with disk storage writes profile
pictures to `../public/profile` and project pictures to `../public/projects`.

## Controller Layer (`controllers/`)

Controllers contain the request/response logic. The general pattern:

```js
const handler = async (req, res, next) => {
    try {
        const result = await Model.findX(...);
        if (!result) res.status(404).json({ error: '...' });
        else res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
```

Controllers **do not** build SQL directly — they use Sequelize query methods
(`findAll`, `findOne`, `findByPk`, `create`) on the models.

| Controller | Functions |
| ---------- | --------- |
| `userController.js` | `getUsers`, `getUserByName`, `getUserById`, `getUsersProjects`, `createUser` |
| `projectController.js` | `getProjects`, `getProjectByName`, `createProject` |
| `authenticationController.js` | `loginUser`, `logoutUser` |

## Model Layer (`models/`)

Sequelize models mirror the database schema. All models set
`underscored: true`, so attribute `isAdmin` maps to the column `is_admin`
(camelCase → snake_case).

### Account (`userModel.js`)

Table: `account`. **`password` is excluded from the default scope**, so it is
never returned by `findAll`/`findOne` unless explicitly requested.

| Attribute | Type | Notes |
| --------- | ---- | ----- |
| `id` | UUID | PK, default `gen_random_uuid()` |
| `lastname` | STRING | required |
| `username` | STRING | required, unique |
| `email` | STRING | required, unique, isEmail |
| `password` | STRING | required, hashed in `beforeCreate`/`beforeUpdate` hooks |
| `isAdmin` | BOOLEAN | default `false` |
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
| `teaserImage` | STRING | default placeholder |
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
| `dev` | `npm run dev` (nodemon, live reload) | development / staging |  |
| `prod` | `npm run run` (plain `node index.js`) | production |

`docker-compose.yml` sets `DB_*`, `SWAGGER_SERVER_URL` and
`SWAGGER_SERVER_DESCRIPTION` per environment.

## Known Issues

- **Passport auth is inactive.** `cookie-session`, `passport.initialize()`,
  `passport.session()` and the `LocalStrategy` registration are commented out
  in `index.js`. `/auth/login` and `/auth/logout` therefore have no working
  session handling.
- **`/users/:name` and `/projects/:name` return 500.** Because
  `underscored: true` queries `is_admin`/`teaser_image`, but the actual
  database columns are `isAdmin`/`teaserImage`. The model attributes need to
  be mapped to the real column names (`field:`).
- **`/categories` uses an undefined `client`.** The inline route calls
  `client.query(...)` but no `pg` client is defined — it throws when called.
  Prefer a Sequelize query (`EnumCategory.findAll()`).
- **`createProject` maps `description` to `desciption`** (typo), so the
  description is never persisted.
