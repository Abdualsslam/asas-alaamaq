# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install curl for HEALTHCHECK
RUN apk add --no-cache curl

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV PORT=4000
ENV NODE_ENV=production

EXPOSE ${PORT}

# Healthcheck using curl to verify the server is accepting connections
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT}/api/health || exit 1

# Start the application
CMD ["npm", "run", "start:prod"]
