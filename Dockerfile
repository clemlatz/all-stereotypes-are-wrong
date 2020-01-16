FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
COPY server/package.json server/yarn.lock ./server/
COPY client/package.json client/yarn.lock ./client/
RUN yarn

# Bundle app source & build client
COPY . .
RUN yarn build

# Expose port 8080 and run app
ENV NODE_ENV=production PORT=8080
EXPOSE 8080
CMD ["yarn", "start"]
