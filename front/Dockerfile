FROM node:13.10.1-alpine3.11

RUN npm install -g serve

COPY build build

EXPOSE $PORT

CMD exec serve -s build -l $PORT
