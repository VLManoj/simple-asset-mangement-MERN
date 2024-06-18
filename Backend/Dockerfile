# Use Node.js v14 as base image
FROM node:14

# Set working directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY ./server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server app code
COPY ./server/ .

# Expose port 5000 (or the port your Node.js server runs on)
EXPOSE 5000

# Command to run the Node.js server
CMD ["npm", "start"]

