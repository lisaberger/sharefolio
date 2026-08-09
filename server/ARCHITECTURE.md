# Backend Architecture

This document describes the architecture of the Sharefolio REST API
(`server/`). It is a Node.js + Express application written in **TypeScript
(ESM)** that uses Sequelize as ORM against a PostgreSQL database and exposes
its API documentation via Swagger.

## Overview

```
        HTTP (port 4000)
              │
              ▼
        ┌─────────────┐
        │  src/app.ts  │  Express app: middleware, route wiring, Swagger
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
                 │    PostgreSQL    │   schema applied by migrations
                 └──────────────────┘
```

The API follows a classic **layered approach**:

- **Router layer** (`routes/`) — maps HTTP paths + methods to controller functions and defines OpenAPI (`@openapi`) annotations for Swagger.
- **Controller layer** (`controllers/`) — extracts request data, talks to the models, and shapes the HTTP responses.
- **Model layer** (`models/`) — Sequelize definitions that map to database tables.
- **Schema layer** (`schemas/`) — zod validators for request bodies (see `middleware/validate.ts`).
- **DB layer** (`db/`) — the Sequelize connection (singleton) and the SQL migration runner.

## Directory Layout

```
server/
├── src/
│   ├── server.ts             # Entry point: run migrations, connect DB, listen on PORT
│   ├── app.ts                # Express app: middleware, static, Swagger, route wiring, error handler
│   ├── swagger.ts            # OpenAPI definition, components/schemas, spec generation
│   ├── config/
│   │   └── env.ts            # zod-validated environment config (exits on invalid env)
│   ├── db/
│   │   ├── db.ts             # Sequelize connection (reads DB_* env vars)
│   │   ├── migrate.ts        # Applies SQL migrations from src/db/migrations
│   │   └── migrations/       # Ordered SQL files (001_domains … 008_project_data)
│   ├── models/
│   │   ├── userModel.ts      # Account (table `account`)
│   │   ├── projectModel.ts   # Project (table `project`)
│   │   └── categoryModel.ts  # EnumCategory (table `enum_category`)
│   ├── controllers/
│   │   ├── userController.ts
│   │   ├── projectController.ts
│   │   └── authenticationController.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   ├── projectRoutes.ts
│   │   └── authRoutes.ts
│   ├── middleware/
│   │   ├── auth.ts           # requireAuth: validates Bearer HMAC token
│   │   ├── errorHandler.ts   # central error middleware
│   │   ├── rateLimiter.ts    # in-memory sliding-window rate limiter
│   │   └── validate.ts       # zod schema validation for request bodies
│   ├── schemas/              # zod schemas (userSchema, projectSchema, authSchema)
│   └── utils/
│       ├── token.ts          # HMAC-signed session tokens
│       └── upload.ts         # multer disk storage for project pictures
├── tests/
│   ├── global-setup.ts       # creates/drops the test database before the suite
│   ├── unit/                 # rateLimiter, schemas, token
│   └── integration/api.test.ts  # supertest against the Express app
├── vitest.config.ts
├── tsconfig.json
└── Dockerfile                # Multi-stage: dev / build / prod
```

## Entry Points

### `src/server.ts` — boot

Responsibilities, in order:

1. **Run migrations** (`runMigrations()` from `db/migrate.ts`) — applies any
   pending SQL files.
2. **Verify the DB connection** via `sequelize.authenticate()`.
3. **Start the HTTP server** on `PORT` (default 4000).

The app itself lives in `src/app.ts` (an Express `app` exported for tests),
so integration tests can use supertest without binding a port.

### `src/app.ts` — Express app

1. **Middleware**: `cors()` restricted to `CORS_ORIGIN` (comma-separated list),
   `bodyParser.json()`.
2. **Static files** under `/public`: `UPLOAD_DIR` (uploaded project pictures)
   and, when `SEED_UI_PUBLIC` is set, `client/public` (bundled seed images).
3. **Swagger** at `/docs` (UI) and `/docs-json` (raw spec).
4. **Routers**: `/users` → `userRoutes`, `/auth` → `authRoutes`,
   `/projects` → `projectRoutes`, `/categories` → inline `getCategories`.
5. **Error handling**: central `errorHandler` middleware.

## Configuration (`config/env.ts`)

All env vars are validated with **zod** at startup; an invalid or incomplete
config prints the errors and `process.exit(1)`:

| Env var | Default | Purpose |
| ------- | ------- | ------- |
| `PORT` | `4000` | HTTP port |
| `DB_HOST` | `postgres` | Database host (service name in Docker) |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `sharefolio` | Database name |
| `DB_USER` | `web` | Database user |
| `DB_PASSWORD` | `web` | Database password |
| `DB_LOG` | `false` | Enable Sequelize SQL logging |
| `UPLOAD_DIR` | `/app/public` | Directory for uploaded files |
| `SEED_UI_PUBLIC` | `` | Optional dir served under `/public` (bundled UI seed images) |
| `SESSION_SECRET` | `change-me-please-dev-secret` | HMAC signing key, **min 16 chars** |
| `SESSION_TTL_MS` | 7 days | Session token lifetime |
| `CORS_ORIGIN` | `http://ui.sharefolio.local` | Allowed origins (comma-separated) |
| `SWAGGER_SERVER_URL` | `http://api.sharefolio.local` | Primary Swagger server URL |
| `SWAGGER_SERVER_DESCRIPTION` | `Sharefolio API` | Swagger server description |

Docker defaults to `postgres`/`/app/public`; host-side runs (e.g. tests) must
override them (see the root README "Testing").

## Authentication

Auth is **stateless** — no session middleware, no Passport. Login verifies
credentials against the database and returns an **HMAC-signed session token**
(`utils/token.ts`), which the client sends as `Authorization: Bearer <token>`.

- `POST /auth/login` takes `{ username, password }` (username **or** email),
  calls the PostgreSQL function `check_password(usr, pw)` via a raw query, and
  returns `{ ...user, token }` on success (user without `password`).
- Failed login → `401`, missing credentials → `400`. Login is rate-limited
  (in-memory limiter, 20 requests / 15 min per IP).
- `POST /auth/logout` → `200` (no server state to clear).
- Protected routes use `requireAuth` (`middleware/auth.ts`), which parses the
  Bearer header and verifies the token signature + expiry via `verifyToken`.
- Password hashing lives **in the database** (pgcrypto `crypt`, bcrypt
  blowfish). The `account` table has a `BEFORE INSERT OR UPDATE` trigger that
  hashes new passwords; the app never stores plain hashes.

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
| `/projects/:name` | GET | `getProjectByName` | Get a project by name |
| `/projects/create` | POST | `createProject` | Create a project (multipart: `pics[]` + `projectData` JSON string, requires auth) |
| `/auth/login` | POST | `loginUser` | Log in (rate-limited, returns token) |
| `/auth/logout` | POST | `logoutUser` | Log out (no server state) |
| `/categories` | GET | `getCategories` | List categories |

Upload handling lives in the project router: `requireAuth` → `multer` disk
storage (allowed MIME types, ≤ 3 files, 10 MB each) writes project pictures
to `<UPLOAD_DIR>/projects` and returns `/public/projects/<file>` paths.

## Controller Layer (`controllers/`)

Controllers contain the request/response logic. The general pattern:

```ts
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
| `userController.ts` | `getUsers`, `getUser`, `getUsersProjects`, `createUser` |
| `projectController.ts` | `getProjects`, `getProjectByName`, `createProject`, `getCategories` |
| `authenticationController.ts` | `loginUser`, `logoutUser` |

## Model Layer (`models/`)

Sequelize models mirror the database schema. All models set
`underscored: true`, so attribute `isAdmin` maps to the column `is_admin`
(camelCase → snake_case). The database uses snake_case consistently
(`is_admin`, `teaser_image`, `creator_id`, ...). `timestamps: false` on all
models.

### Account (`userModel.ts`)

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

### Project (`projectModel.ts`)

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

### EnumCategory (`categoryModel.ts`)

Table: `enum_category`. Simple `id` (integer, auto-increment) + `name`
(string, unique).

## DB Layer & Migrations (`db/`)

- `db.ts` creates a single Sequelize instance from the `DB_*` env vars
  (same image works in every environment without code changes).
- **The schema is defined by SQL migrations in `src/db/migrations/`**
  (`001_domains.sql` … `008_project_data.sql`). `db/migrate.ts` applies them
  inside transactions and tracks them in a `schema_migrations` table
  (idempotent; files run in filename order). Migrations run **automatically at
  server start** (`server.ts`) and can be run manually via `npm run migrate`.
  New migrations must be added there, not to `database/postgres/`.
- The Postgres image (`database/postgres/`) only creates the `web` user +
  database and installs **pgcrypto into `template1`** (so every new database,
  including `sharefolio_test`, has it). The `check_password` function and the
  password-hashing trigger are created by the migrations.

## Swagger (`src/swagger.ts`)

- OpenAPI 3.0.0 spec generated from the `@openapi` JSDoc in `src/routes/*.ts`.
- `components.schemas` define the shared shapes: `User`, `UserCreate`,
  `LoginCredentials`, `Project`, `ProjectCreate`, `Category`, `Error`.
- Routes reference these schemas via `$ref` instead of inlining them.
- The primary server URL is configurable via `SWAGGER_SERVER_URL` /
  `SWAGGER_SERVER_DESCRIPTION` (set per environment in Docker Compose).
- The route glob points at `routes/*.ts` in dev and `routes/*.js` after `tsc`
  (the compiled output lives in `dist/routes/`).
- Served at `/docs` (Swagger UI) and `/docs-json` (raw spec).

## Docker

`Dockerfile` uses `node:24-alpine` with three stages (see the root
`docker-compose.yml` for how environments select a target via `API_TARGET`):

| Target | Command | Use |
| ------ | ------- | --- |
| `dev` | `npm run dev` (tsx watch, live reload) | development |
| `build` | `npm run build` (tsc → `dist/`) | intermediate build stage |
| `prod` | `npm run start` (`node dist/server.js`) | staging / production |

`tsc` does not copy `.sql` files, so the prod stage additionally copies
`src/db/migrations` into `dist/db/migrations` — migrations then run from the
compiled output. `docker-compose.yml` sets `DB_*`, `UPLOAD_DIR`,
`SEED_UI_PUBLIC`, `CORS_ORIGIN`, `SESSION_SECRET`, `SWAGGER_SERVER_URL` and
`SWAGGER_SERVER_DESCRIPTION` per environment.

## Testing

Vitest (`vitest.config.ts`, `globals: true`). `tests/global-setup.ts` drops and
recreates a `sharefolio_test` database and applies the migrations before the
suite runs, so **integration tests need a Postgres reachable on localhost:5432**
with user `web`/`web` and pgcrypto available in new databases. Unit tests
(`tests/unit/`) cover the rate limiter, the zod schemas, and the token util
without a database. See the root README "Testing" for the required env
overrides when running on the host.
