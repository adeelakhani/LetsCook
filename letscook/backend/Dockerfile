# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=24.1.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development
ENV NODE_ENV development

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application with nodemon for hot reloading
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV production

# Install all dependencies (same as development since you don't have separate prod deps)
RUN npm ci

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["node", "index.js"]
