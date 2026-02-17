# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install

# Copy rest of the application
COPY . .

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
