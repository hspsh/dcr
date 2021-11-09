FROM node:alpine
WORKDIR /code
COPY ./package.json .
RUN yarn install
COPY . .
RUN yarn build
WORKDIR /code/dist