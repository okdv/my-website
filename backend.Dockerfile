FROM strapi/base
WORKDIR /opt/app
COPY ./backend/app/package.json ./
COPY ./backend/app/yarn.lock ./
COPY ./.env ./

RUN yarn install

COPY ./backend/app .

ARG NODE_ENV
ARG DB_CLIENT 
ARG DB_PORT
ARG DB_NAME
ARG DB_USERNAME
ARG DB_PASSWORD

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_CLIENT=${DB_CLIENT}
ENV DATABASE_NAME=${DB_NAME}
ENV DATABASE_PORT=${DB_PORT}
ENV DATABASE_USERNAME=${DB_USERNAME}
ENV DATABASE_PASSWORD=${DB_PASSWORD}

RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]
