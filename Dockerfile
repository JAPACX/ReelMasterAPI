# Stage 1: Build TypeScript code
FROM node:16 AS builder

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY src ./src

# Build TypeScript code
RUN npm run build

# Stage 2: Create a lightweight image for production
FROM node:16-alpine AS production

WORKDIR /app

COPY package.json .
COPY --from=builder /app/dist ./dist

RUN npm install --production

# For production, use the start command
CMD ["npm", "start"]
