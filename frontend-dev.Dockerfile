FROM node:16-alpine

WORKDIR /app
COPY ./.env.development .
COPY ./frontend .

ARG EMAIL
ARG PUBLIC_URL
ARG PUBLIC_MEDIA_URL
ARG PUBLIC_API
ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
