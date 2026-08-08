# syntax=docker/dockerfile:1

###############
#  Dev stage  #
###############
FROM node:24-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]

###############
#  Build stage #
###############
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

###############
# Prod stage  #
###############
FROM node:24-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY src/db/migrations ./dist/db/migrations

EXPOSE 4000

CMD ["npm", "run", "start"]
