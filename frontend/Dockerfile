FROM node:18-alpine AS base


RUN corepack enable

FROM base AS build
COPY . /frontend/src/app
WORKDIR /frontend/src/app


# Install dependencies

# Deploy only the dokploy app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN cp -R /usr/src/app/apps/website/.next /prod/website/.next

FROM base AS dokploy
WORKDIR /app

# Set production
ENV NODE_ENV=production

# Copy only the necessary files
COPY --from=build /prod/website/.next ./.next
COPY --from=build /prod/website/public ./public
COPY --from=build /prod/website/package.json ./package.json
COPY --from=build /prod/website/node_modules ./node_modules

EXPOSE 3000
CMD HOSTNAME=0.0.0.0 && pnpm start