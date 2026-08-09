# Sharefolio

Sharefolio is a full-stack web platform for creative people to showcase their portfolios and best work.

## Features

- Portfolio profiles with biography, job, location and profile pictures
- Project gallery with project detail pages, categories and contributors
- Global search across projects
- Multi-language UI (German / English)
- Form validation and a multi-step registration flow
- Adminer web client to inspect the Postgres database

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | Vue 3 (Composition API, `<script setup>`), TypeScript, Vite, Pinia, Vue Router, Vue I18n, Vuelidate, PrimeVue, Tailwind CSS |
| Backend | Node.js, Express, Sequelize (ORM), stateless HMAC-session tokens |
| Database | PostgreSQL 17 |
| Reverse Proxy | Traefik |
| Infra | Docker + Docker Compose |
| Testing | Vitest, Vue Test Utils, Cypress |
| Linting / Formatting | ESLint, Prettier, Stylelint |

## Environments

The project ships **three environments**, all orchestrated by Docker Compose.
They share one base configuration (`docker-compose.yml`) and differ via
compose **override files** plus environment-specific `.env` files.

| Environment | Command | Hostnames | Backend build | Frontend build |
| ----------- | ------- | --------- | ------------- | -------------- |
| development | `docker compose up` | `*.sharefolio.local` | dev (nodemon) | dev (vite + HMR) |
| staging | `docker compose --env-file .env.staging -f docker-compose.yml -f docker-compose.staging.yml up` | `*.staging.sharefolio.local` | prod (node) | serve (static dist) |
| production | `docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml up` | `*.prod.sharefolio.local` | prod (node) | serve (static dist) |

Each environment has its own Postgres named volume (`pgdata_dev`,
`pgdata_staging`, `pgdata_prod`) and its own database name (`WEB_DB` in the
respective `.env.*`), so data is fully isolated.

### Task Runner

A `Makefile` wraps the Compose commands, so you never have to remember the
`--env-file`/`-f` flags:

```sh
make dev           # start development
make dev-stop      # stop development
make staging       # start staging
make staging-stop  # stop staging
make prod          # start production
make prod-stop     # stop production

make start ENV=staging   # start any environment (dev|staging|prod)
make stop  ENV=staging   # stop any environment
make status              # show running services
make logs ENV=dev        # follow logs (default ENV=dev)
make psql ENV=dev        # open a psql shell
make help                # list all targets
```

Run `make help` for the full list.

### Environment files

| File | Purpose |
| ---- | ------- |
| `.env` | development values (auto-loaded by Compose) |
| `.env.staging` | staging values (loaded via `--env-file`) |
| `.env.prod` | production values (loaded via `--env-file`) |
| `.env.example` | template with defaults and comments |

All `.env*` files are git-ignored; copy `.env.example` to create them.

## Architecture

Docker Compose orchestrates five services:

| Service | Dockerfile | Internal port | Published |
| ------- | ---------- | ------------- | --------- |
| `traefik` | image `traefik:latest` | 80 (web), 8080 (dashboard) | `80:80`, `8080:8080` |
| `postgres` | `database/postgres/Dockerfile` | 5432 | internal only |
| `api` | `server/Dockerfile` | 4000 | internal (via Traefik) |
| `ui` | `client/Dockerfile` | 5173 | internal (via Traefik) |
| `adminer` | `database/adminer/Dockerfile` | 8080 | internal (via Traefik) |

All traffic enters through Traefik on port 80 and is routed to the right
service based on the requested hostname.

```
Browser
   │
   ├─ ui.sharefolio.local  ────────────► UI       (vite dev / serve, port 5173)
   ├─ api.sharefolio.local ────────────► API      (Express + Sequelize, port 4000)
   └─ adminer.sharefolio.local ────────► Adminer  (web DB client, port 8080)
               │
           [Traefik] ── reverse proxy, routes by Host header
               │
          ┌────┴────┐
        postgres   adminer → postgres
```

The API reads its database settings from environment variables
(`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_PORT`), so the same image
works in every environment. See `server/src/db/db.ts`.

## Repository Layout

```
.
├── server/             # Express REST API (TypeScript), Sequelize models, migrations, Swagger docs
├── database/           # PostgreSQL Docker image + Adminer image
├── client/             # Vue 3 / TypeScript / Vite application
│   └── src/
│       ├── api/        # HTTP repositories + global error mapping
│       ├── config/     # Dependency injection / wiring
│       ├── core/       # Domain models, contracts, error taxonomy
│       └── ui/         # Vue components, pages, router, i18n
├── docker-compose.yml          # Base compose configuration
├── docker-compose.override.yml # Development overrides (auto-loaded)
├── docker-compose.staging.yml  # Staging overrides
├── docker-compose.prod.yml     # Production overrides
├── .env.example                # Environment template
└── .env                        # Local environment variables (not committed)
```

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (with Docker Compose)
- A local HTTP port 80 free (Traefik entrypoint)

### 1. Configure local domain names

The `.local` hostnames are resolved by **dnsmasq**, so you can reach the apps
by name without editing `/etc/hosts`.

Install and configure dnsmasq (once):

```sh
brew install dnsmasq
echo 'address=/sharefolio.local/127.0.0.1' >> "$(brew --prefix)/etc/dnsmasq.conf"
sudo mkdir -p /etc/resolver
echo 'nameserver 127.0.0.1' | sudo tee /etc/resolver/sharefolio.local
sudo brew services start dnsmasq
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

The wildcard `address=/sharefolio.local/127.0.0.1` resolves every subdomain
(including `*.staging.sharefolio.local` and `*.prod.sharefolio.local`), so no
further changes are needed when switching environments.

### 2. Create environment files

```sh
cp .env.example .env         # development (default)
cp .env.example .env.staging # staging
cp .env.example .env.prod    # production
```

Adjust the `UI_HOST` / `API_HOST` / `ADMINER_HOST` / `BACKEND_URL` and
`DOCKER_SOCKET` values in each file.

> macOS Docker Desktop: set `DOCKER_SOCKET` to the real socket path, e.g.
> `~/.docker/run/docker.sock` (see `.env`).

### 3. Start an environment

```sh
# Development (auto-loads docker-compose.override.yml)
docker compose up --build

# Staging
docker compose --env-file .env.staging -f docker-compose.yml -f docker-compose.staging.yml up --build

# Production
docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml up --build
```

### 4. Open the application

| URL | Service |
| --- | ------- |
| `http://ui.sharefolio.local` | Frontend UI (dev) |
| `http://api.sharefolio.local/docs` | Swagger API docs (dev) |
| `http://adminer.sharefolio.local` | Adminer (DB client, dev) |
| `http://localhost:8080` | Traefik dashboard |

Replace the hostnames with `*.staging.*` or `*.prod.*` for the other
environments.

## Local Development (Hybrid)

To iterate on the frontend outside of Docker, run the backend stack in Docker
and the Vite dev server locally:

```sh
# Terminal 1 – database + API + Traefik
docker compose up -d postgres api adminer

# Terminal 2 – frontend with hot reload
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## Frontend-Only Commands

Run inside the `client/` directory:

```sh
npm run dev            # Start Vite dev server (port 5173)
npm run type-check     # vue-tsc type checking
npm run lint           # ESLint (auto-fix)
npm run lint:nofix     # ESLint (report only)
npm run test           # Vitest (watch mode)
npm run test:nowatch   # Vitest (single run)
npm run build          # type-check + production build
npm run build-only     # production build only
```

## Configuration

### Frontend → Backend URL

The frontend resolves the API base path at runtime, in this order:

1. `VITE_BACKEND_URL` build/dev-time variable (set per environment in compose)
2. `client/public/assets/app-config.json` → `BACKEND_URL`
3. Fallback: `http://localhost:4000`

Each environment passes its own `BACKEND_URL` to the `ui` service, so the
frontend always talks to the matching API instance.

### Docker Compose variables

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `WEB_DB` | `sharefolio` | Database name created by the Postgres image |
| `DOCKER_SOCKET` | `/var/run/docker.sock` | Host Docker socket mounted into Traefik |
| `UI_HOST` | `ui.sharefolio.local` | Hostname for the frontend router |
| `API_HOST` | `api.sharefolio.local` | Hostname for the API router |
| `ADMINER_HOST` | `adminer.sharefolio.local` | Hostname for the Adminer router |
| `BACKEND_URL` | `http://api.sharefolio.local` | Base URL the frontend uses for the API |

## Testing

### Backend (`server/`)

Run inside the `server/` directory:

```sh
npm run typecheck     # tsc --noEmit
npm run test          # vitest (unit + integration, single run)
npm run test:watch    # vitest watch mode
npm run build         # tsc → dist/
npm run migrate       # apply DB migrations manually (also run automatically at server start)
```

The integration tests need a **Postgres reachable on localhost:5432**. The
`tests/global-setup.ts` drops and recreates a `sharefolio_test` database as
user `web`/`web`, applies the migrations, and needs pgcrypto available in new
databases (the compose `postgres` image installs it into `template1`). The
compose `postgres` does **not** publish port 5432, and the app defaults
(`DB_HOST=postgres`, `UPLOAD_DIR=/app/public`) are Docker values, so host-side
runs need environment overrides:

```sh
DB_HOST=localhost UPLOAD_DIR=/tmp/sharefolio-uploads npm test
```

### Frontend (`client/`)

```sh
npm run test:nowatch  # vitest (jsdom, no external services)
npm run type-check
npm run lint:nofix
```

## Architecture

- **Backend:** see [`server/ARCHITECTURE.md`](server/ARCHITECTURE.md) — layers, models, routes, env configuration, migrations.
- **Frontend:** see [`client/ARCHITECTURE.md`](client/ARCHITECTURE.md) — the layered UI architecture (UI / Core / Config / API).

## Credits

Built as a student project for Interactive Media at the University of Applied Sciences Augsburg.

- Based on <https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01> (Postgres account schema), modified for this project.
- Reverse proxy setup based on Traefik's [Docker provider](https://doc.traefik.io/traefik/providers/docker/).
