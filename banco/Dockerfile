# Derivando da imagem oficial do MySQL
FROM mysql/mysql-server:8.0.23 AS builder
# Adicionando os scripts SQL para serem executados na criação do banco
COPY ./db/ /docker-entrypoint-initdb.db/

