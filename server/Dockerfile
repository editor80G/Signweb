# Use the official Node.js image
FROM node:22   
# Set environment variables
ENV PORT=8080
# Set the working directory
WORKDIR /app
# Copy all files from the current directory to the container
COPY  . .
# Set expose the port the app runs on
EXPOSE 8080
# Array of commands to run the app
CMD ["node", "src/server.js"]