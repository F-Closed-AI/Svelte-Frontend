# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .
# Build the Next.js project
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 4173

# Command to start the Next.js app
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
