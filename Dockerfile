FROM node:12-alpine AS BUILD_IMAGE

# couchbase sdk requirements
RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)

WORKDIR /usr/src/app

COPY package*.json ./

# install dependencies
RUN yarn --frozen-lockfile

# копируем исходный код
COPY . .


RUN npm install

FROM node:12-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/build ./build
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules


EXPOSE 8080:8080
CMD [ "node", "build/src/app.js" ]