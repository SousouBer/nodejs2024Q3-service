FROM node:22.11-alpine as build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

FROM node:22.11-alpine as main

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run start:dev"]
