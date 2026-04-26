# ---- Build Stage ----
FROM node:22-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_BASE_API_URL="/"
ARG VITE_BROWSER_HISTORY=true
ENV VITE_BROWSER_HISTORY=$VITE_BROWSER_HISTORY
ENV VITE_BROWSER_HISTORY=$VITE_BROWSER_HISTORY

RUN pnpm build

# ---- Production Stage ----
FROM nginx:alpine AS production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]