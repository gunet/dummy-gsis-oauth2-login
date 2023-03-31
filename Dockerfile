FROM node:16-bullseye-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
VOLUME /home/node/app/node_modules/
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install && npm cache clean -f

COPY . . 

EXPOSE 4099
ENV NODE_ENV=development
USER node

CMD [ "node", "index.js" ]