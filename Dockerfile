FROM node:12
WORKDIR /opt/api
COPY package.json .
COPY yarn.lock .
COPY .env .
RUN yarn 
EXPOSE 3000
CMD [ "yarn", "start:prod" ]
