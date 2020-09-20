FROM node:alpine as build

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY package.*json ./
RUN npm install

COPY . ./
EXPOSE 3000

CMD ["npm", "start"]