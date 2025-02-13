# Use a lightweight Node.js image
FROM node:20.17.0-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.yaml, and .npmrc for dependency installation
COPY package.json pnpm-lock.yaml 

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --strict-peer-dependencies

# Copy the entire project after dependencies to leverage caching
COPY . .

# Build the project
RUN pnpm run build

# Expose necessary ports (adjust based on your app's needs)
EXPOSE 3007 3008

# Set the default command to start the application
CMD ["pnpm", "run", "start:prod"]
