# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /rocket_now_front_end

# Copy package.json and yarn.lock (or package-lock.json if using npm)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]