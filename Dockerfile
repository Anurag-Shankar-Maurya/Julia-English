# Stage 1: Build the React app using Node.js
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the built app using "serve" package
FROM node:18-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port 3000 (default port for serve)
EXPOSE 3000

# Start the server to serve the built files
CMD ["serve", "-s", "dist", "-l", "3000"]
