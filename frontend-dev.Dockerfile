FROM node:16-alpine

WORKDIR /app
COPY ./.env.development .
COPY ./frontend .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN npm install

EXPOSE 4000
EXPOSE 3000

CMD ["npm", "run", "dev"]
