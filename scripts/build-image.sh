#!/bin/bash

APP_NAME=$(node -p -e "require('./package.json').name")
APP_VERSION=$(node -p -e "require('./package.json').version")

# we need to set dummy data for POSTGRES env vars in order for build not to fail
docker buildx build \
    -t ${APP_NAME}:${APP_VERSION} \
    -t ${APP_NAME}:latest \
    .

docker image prune -f
