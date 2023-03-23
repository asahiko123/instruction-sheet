FROM node:18.1-alpine

WORKDIR /app

RUN apk update &&\
    npm install -g npm &&\
    npm install -g vue-cli\
    npm install -g git

COPY package*.json ./
COPY . .

EXPOSE 8080