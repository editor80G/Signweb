# Use the official Node.js image of version 22
FROM node:22   
# Set port in the container by default, if not passed with -e
#ENV PORT=8080
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --production
# Copy all files from the current directory to the container wi
COPY  . .
# Set expose the port the app runs on
EXPOSE 8080
# Array of commands to run the app
CMD ["node", "src/server.js"]
# Install net-tools for netstat
RUN apt-get update && apt-get install -y net-tools