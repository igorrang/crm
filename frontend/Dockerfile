FROM node:20-alpine AS base

RUN apk update && apk add openssh

FROM base AS deps

# Adiciona lib para compatibilidade devido ao 'musl'
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh
COPY keys/my_key /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa


RUN npm run build


# Imagem de produção com todas as configurações necessárias
FROM base AS production
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH "/app/node_modules/sharp"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/public ./public

# Permissões para poder usar corretamente o prerender do Next.js
RUN mkdir -p /home/next/.ssh
RUN chown nextjs:nodejs .next

RUN cp /root/.ssh/id_rsa /home/nextjs/.ssh/id_rsa \
    && chmod 600 /home/nextjs/.ssh/id_rsa \
    && chown nextjs:nodejs /home/nextjs/.ssh/id_rsa

COPY --from=deps /app/next.config.mjs ./

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs


EXPOSE 3000

ENV HOSTNAME "konvictus.com"

# Standalone output para não precisar usar todas as libs dentro do node_modules
CMD ["sh", "-c", "ssh -i  /home/nextjs/.ssh/id_rsa root@92.112.179.19 'cd ../home  && node server.js'"]