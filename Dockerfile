# Point 93: Clean Multi-Stage Build Strategy
# Stage 1: Build Environment
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production Serving Environment
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard port
EXPOSE 80

# Configure custom Nginx routing for React SPA if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
