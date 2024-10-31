# Sharefolio

Sharefolio is a full-stack application designed to serve as a sharing platform for portfolios. Creative individuals can use this platform to showcase themselves and their best work.

```
                           __       __
 ___| |__   __ _ _ __ ___ / _| ___ | (_) ___  
/ __| '_ \ / _` | '__/ _ \ |_ / _ \| | |/ _ \
\__ \ | | | (_| | | |  __/  _| (_) | | | (_) |
|___/_| |_|\__,_|_|  \___|_|  \___/|_|_|\___/
```

## Setup

Run

```sh
npm install
```

In both the root directory and the /backend folder to acquire all dependencies.

To run the dev script you require _nodemon_, so run

```sh
npm install -g nodemon --save
```

Otherwise, use the _run_ script

### Start up Database and REST Api

```sh
cd backend
npm install
docker compose up
npm run dev
```

This starts the database development server and the REST API. You may use

```sh
npm run serve
```

instead of

```sh
docker compose up
```

The API request server runs on localhost:4000 using expressjs

Uses <https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01> as basis, modified for this project.

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
