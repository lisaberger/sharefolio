# Sharefolio

A student project for Interactive Media at the University of Applied Sciences Augsburg using Vuejs

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
