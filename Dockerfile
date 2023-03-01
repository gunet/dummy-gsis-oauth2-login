FROM node:16

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
VOLUME /home/node/app/node_modules/
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install

# Install the application's dependencies into the node_modules's cache directory.
COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 4099
ENV NODE_ENV=development
USER node

CMD [ "node", "index.js" ]