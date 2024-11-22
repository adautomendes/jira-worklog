FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY worklog-rest.js ./

CMD [ "node", "worklog-rest.js" ]