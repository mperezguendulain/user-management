FROM node:22.13.1-alpine3.21

WORKDIR /app

# Copy the package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install dependences
RUN yarn

# Copy the source code into the container
COPY . .

# Install TS to compile the project
RUN yarn global add typescript

# Compile the TS code
RUN tsc

# Expose port
EXPOSE 3001

# Execute the node app
CMD ["node", "dist/index.js"]