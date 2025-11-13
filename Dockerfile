FROM node:16-bullseye-slim

RUN apt-get update && apt-get install -yq --no-install-recommends procps && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
VOLUME /home/node/app/node_modules/
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install && npm cache clean -f

COPY . .

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD pgrep -f "node index.js" || exit 1

EXPOSE 4099/tcp
ENV PORT=4099
ENV ADDRESS=0.0.0.0
ENV USERID=gunetdemo
ENV TAXID=012345678
ENV LASTNAME=ΔΟΚΙΜΑΣΤΙΚΟΣ
ENV TZ=Europe/Athens
USER node

CMD [ "node", "index.js" ]