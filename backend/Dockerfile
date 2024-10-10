# Base Image
FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./




RUN npm install

COPY . .

# Production Image

EXPOSE 5050
CMD ["npm", "run", "dev"]