FROM node:latest

WORKDIR /usr/app

ENV NODE_ENV prod

COPY package.*json ./
RUN npm install
COPY . ./

RUN npm run build
# RUN npm run db:migrate


CMD ["npm", "run", "prod"]