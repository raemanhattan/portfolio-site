FROM node:22-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# next.config.ts reads process.env.CONTRACT_VALUE_ORIGIN at module load
# time, and Next.js loads the config during `next build` (not just at
# `next start`), so the rewrite destination gets frozen into the build
# output -- a plain runtime env var set after the fact has no effect.
ARG CONTRACT_VALUE_ORIGIN
ENV CONTRACT_VALUE_ORIGIN=$CONTRACT_VALUE_ORIGIN
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
