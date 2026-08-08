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
# Prod stage  #
###############
FROM node:24-alpine AS prod

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 4000

CMD ["npm", "run", "run"]
