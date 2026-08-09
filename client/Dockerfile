# syntax=docker/dockerfile:1

###############
# Build stage #
###############
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

###############
#  Dev stage  #
###############
FROM node:24-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

################
# Serving stage #
################
FROM node:24-alpine AS serve

WORKDIR /app

RUN npm install -g serve@latest --silent

COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
