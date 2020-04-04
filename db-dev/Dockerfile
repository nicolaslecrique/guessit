FROM postgres:12-alpine

ENV POSTGRES_PASSWORD ibo-db-root-pwd
# container will execute scripts on docker-entrypoint-initdb.d folder by alphabetical order
# cf. https://hub.docker.com/_/postgres/, initialize a fresh instance
COPY sql_init /docker-entrypoint-initdb.d