FROM node as builder
WORKDIR /usr/app

RUN apt-get update -y \
    && apt-get install -y wget unzip

RUN mkdir -p /tmp \
    && wget https://github.com/gothinkster/node-express-prisma-v1-official-app/archive/refs/heads/main.zip -P /tmp \
    && unzip -d /tmp /tmp/main.zip \
    && mv -v /tmp/node-express-prisma-v1-official-app-main/* ./

RUN npm ci

FROM node
WORKDIR /usr/app

COPY --from=builder /usr/app .
COPY seed.ts prisma/.

CMD npm run prisma:reset -- --force && npm start