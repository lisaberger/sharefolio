# Sharefolio Frontend

Vue 3 + TypeScript application for Sharefolio (see the [root README](../README.md)).

## Commands

```sh
npm install      # install dependencies
npm run dev      # start Vite dev server (port 5173)
npm run build    # type-check + production build
npm run type-check
npm run lint     # ESLint (auto-fix)
npm run test:nowatch
```

## Source Layout

```
src/
├── api/        # HTTP repositories + global error mapping
├── config/     # Dependency injection / wiring
├── core/       # Domain models, contracts, error taxonomy
└── ui/         # Vue components, pages, router, i18n
```

The layers follow the project's layered architecture (see `ARCHITECTURE.md`).
