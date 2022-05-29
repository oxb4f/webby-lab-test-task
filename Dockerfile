FROM node:lts-alpine

ARG APP_PORT=8050

ENV APP_PORT=${APP_PORT}

ARG NODE_ENV="development"

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/webby-lab-test-task

RUN apk add --update sqlite && rm -rf /var/cache/apk/*

RUN npm install -g npm

COPY package*.json ./

RUN if [ "$NODE_ENV" != "development" ]; then \
      npm ci ; \
    fi

RUN if [ "$NODE_ENV" == "development" ]; then \
      npm install ; \
    fi

COPY . .

EXPOSE ${APP_PORT}

CMD [ "npm", "start" ]
