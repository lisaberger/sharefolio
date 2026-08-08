#!/usr/bin/env bash
set -e
db=$WEB_DB

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE USER web WITH LOGIN CREATEDB PASSWORD 'web'
EOSQL

echo "Creating Database $db"
createdb --username web $db

echo "------------> 10_database.sh has finished sucessfully"
echo "------------> Schema is applied by the backend migrations on startup"
