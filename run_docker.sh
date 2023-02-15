#!/usr/bin/env bash

PORT=4099
docker stop dummy-gsis-oauth2-login && docker rm dummy-gsis-oauth2-login
docker run -d -p $PORT:4099 -v $PWD/:/usr/src/app/ -v $PWD/node_modules:/usr/src/app/node_modules --name=dummy-gsis-oauth2-login dummy-gsis-oauth2-login