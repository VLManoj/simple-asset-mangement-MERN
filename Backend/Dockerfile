# Use Node.js v14 as base image
FROM node:14

# Set working directory
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY ./client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client app code
COPY ./client/ .

# Expose port 3000 (default create-react-app port)
EXPOSE 3000

# Command to run the React application
CMD ["npm", "start"]
