FROM node:20-alpine AS builder

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine AS production



COPY --from=builder /src/.next ./.next
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package.json ./package.json
COPY ./src/ecosystem.config.js .

RUN npm install pm2 -g .


ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["pm2-runtime","start","ecosystem.config.js"]