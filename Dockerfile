FROM node:16-alpine as build

WORKDIR /app
COPY ./.env .
COPY ./frontend .

RUN npm ci
RUN npm audit fix
RUN npm run build

FROM node:16-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./

RUN npm ci --production --ignore-scripts
RUN npm audit fix

COPY --from=build /app/build ./

EXPOSE 3000
CMD ["node", "index.js"]