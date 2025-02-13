# Use a lightweight Node.js image
FROM node:20.10.0-alpine AS base

# Install dependencies and pnpm globally
RUN apk add --no-cache bash curl && \
    curl -fsSL https://get.pnpm.io/install.sh | bash && \
    export PNPM_HOME="/root/.local/share/pnpm" && \
    export PATH="$PNPM_HOME:$PATH" && \
    pnpm config set store-dir /pnpm-store

# Set environment variables
ENV NODE_ENV=production
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set working directory
WORKDIR /usr/src/homezone

# Copy package.json and pnpm-lock.yaml (if exists) first for efficient caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the NestJS project
RUN pnpm run build

# Expose necessary ports
EXPOSE 3007 3008

# Default command (will be overridden by docker-compose.yml)
CMD ["pnpm", "run", "start:prod"]
