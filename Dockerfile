FROM node:lts-alpine3.14  AS Builder

WORKDIR /zeiss-monitor

COPY . ./

RUN npm install --registry https://registry.npm.taobao.org/


FROM nginx:stable-alpine

WORKDIR /zeiss-monitor

EXPOSE 80 443

VOLUME /etc/nginx/

ADD dist/ /zeiss-monitor/dist

COPY nginx.conf /etc/nginx/nginx.conf