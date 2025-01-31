FROM node:22.13.1-alpine3.21

WORKDIR /app

# Copy the package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install dependences
RUN yarn

# Copy the source code into the container
COPY . .

# Compile project
RUN yarn build

# Expose port
EXPOSE 3000

# Execute the node app
CMD ["yarn", "start"]