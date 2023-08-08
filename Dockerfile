FROM node:18

WORKDIR /usr/src/app

COPY .yarnrc.yml ./

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "run", "dev"]
