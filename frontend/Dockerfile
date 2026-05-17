FROM node:22-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build
COPY . .
ARG NEXT_PUBLIC_API_URL=https://www.insucomsigorta.site/api
ARG NEXT_PUBLIC_MEDIA_BASE_URL=https://insucomstorage.blob.core.windows.net/medya
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_MEDIA_BASE_URL=$NEXT_PUBLIC_MEDIA_BASE_URL
RUN npm run build

# Production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# [Kritik Eksik Tamamlandı] Sunucu tarafındaki (SSR) isteklerin de adresi görebilmesi için buraya da ekledik
ARG NEXT_PUBLIC_API_URL=https://www.insucomsigorta.site/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy original package.json to prevent ERR_INVALID_PACKAGE_CONFIG
COPY --from=base /app/package.json ./

COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]