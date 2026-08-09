# The database schema and seed data are managed by migrations inside the
# backend (`backend/src/db/migrations`). The Postgres image only needs to:
#  1. install pgcrypto (template1 so every new database inherits it)
#  2. create the application user and database
# The schema is applied by `npm run migrate` when the backend starts.

FROM postgres:17-alpine AS builder

ARG WEB_DB

ENV POSTGRES_USER     postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB       postgres
ENV WEB_DB            $WEB_DB
ENV PGDATA            /var/lib/postgresql/custom

USER postgres

COPY custom-entrypoint.sh /usr/local/bin/
COPY init /docker-entrypoint-initdb.d/

USER root

RUN chmod +x /usr/local/bin/custom-entrypoint.sh

USER postgres

RUN    mkdir "${PGDATA}" \
    && custom-entrypoint.sh postgres

ENTRYPOINT [ "custom-entrypoint.sh" ]
CMD [ "-c", "max_locks_per_transaction=512" ]


FROM postgres:17-alpine

ENV POSTGRES_USER     postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB       postgres
ENV PGDATA            /var/lib/postgresql/data

VOLUME /var/lib/postgresql/data

COPY --from=builder /var/lib/postgresql/custom /var/lib/postgresql/data

HEALTHCHECK CMD pg_isready -U postgres -d postgres
