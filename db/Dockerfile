FROM postgres:alpine
ENV POSTGRES_DB postgres
ENV POSTGRES_PASSWORD password
COPY ./init.sql /docker-entrypoint-initdb.d/