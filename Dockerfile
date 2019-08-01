FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn

# Bundle app source
COPY . .

# Expose port 8080 and run app
ENV NODE_ENV=production PORT=8080
EXPOSE 8080
CMD ["yarn", "start"]
