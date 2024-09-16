# Base Image
FROM node:20-alpine AS base

WORKDIR /Users/igorrangelkonvictus/crm/backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Production Image

EXPOSE 5050
CMD ["npm", "run", "dev"]