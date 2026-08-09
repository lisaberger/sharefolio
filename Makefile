# Sharefolio task runner
#
# Usage:
#   make dev          start development environment
#   make dev-stop     stop development environment
#   make staging      start staging environment
#   make staging-stop stop staging environment
#   make prod         start production environment
#   make prod-stop    stop production environment
#   make status       show running services
#   make logs         follow logs of an environment (ENV=dev|staging|prod)
#   make psql         open a psql shell (ENV=dev|staging|prod)

SHELL := /bin/bash

ENV ?= dev

COMPOSE_FILES_dev     := -f docker-compose.yml -f docker-compose.override.yml
COMPOSE_FILES_staging := -f docker-compose.yml -f docker-compose.staging.yml
COMPOSE_FILES_prod    := -f docker-compose.yml -f docker-compose.prod.yml

.PHONY: dev dev-stop staging staging-stop prod prod-stop \
        start stop status logs psql help

## start an environment (default: dev)
start:
	$(if $(filter dev,$(ENV)),docker compose $(COMPOSE_FILES_dev) up -d --build,docker compose --env-file .env.$(ENV) $(COMPOSE_FILES_$(ENV)) up -d --build)

## stop an environment (default: dev)
stop:
	$(if $(filter dev,$(ENV)),docker compose $(COMPOSE_FILES_dev) down,docker compose --env-file .env.$(ENV) $(COMPOSE_FILES_$(ENV)) down)

## start the development environment
dev:
	docker compose up -d --build

## stop the development environment
dev-stop:
	docker compose down

## start the staging environment
staging:
	docker compose --env-file .env.staging $(COMPOSE_FILES_staging) up -d --build

## stop the staging environment
staging-stop:
	docker compose --env-file .env.staging $(COMPOSE_FILES_staging) down

## start the production environment
prod:
	docker compose --env-file .env.prod $(COMPOSE_FILES_prod) up -d --build

## stop the production environment
prod-stop:
	docker compose --env-file .env.prod $(COMPOSE_FILES_prod) down

## show running services
status:
	docker compose ps

## follow logs of an environment (ENV=dev|staging|prod)
logs:
	$(if $(filter dev,$(ENV)),docker compose $(COMPOSE_FILES_dev) logs -f,docker compose --env-file .env.$(ENV) $(COMPOSE_FILES_$(ENV)) logs -f)

## open a psql shell in the database (ENV=dev|staging|prod)
psql:
	$(if $(filter dev,$(ENV)),docker compose $(COMPOSE_FILES_dev) exec postgres psql -U web $(shell grep '^WEB_DB' .env 2>/dev/null | cut -d= -f2 || echo sharefolio),docker compose --env-file .env.$(ENV) $(COMPOSE_FILES_$(ENV)) exec postgres psql -U web $(shell grep '^WEB_DB' .env.$(ENV) 2>/dev/null | cut -d= -f2 || echo sharefolio))

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:' $(MAKEFILE_LIST) | grep -v '^#' | sed -E 's/:$$//' | sort | \
		awk '{printf "  %-16s\n", $$1}'
