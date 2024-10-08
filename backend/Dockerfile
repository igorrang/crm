# Base Image
FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

RUN npm install

COPY . .

# Production Image

EXPOSE 5050
CMD ["npm", "run", "dev"]