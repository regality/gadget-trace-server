FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN yarn

EXPOSE 4368
CMD ["yarn", "start"]
