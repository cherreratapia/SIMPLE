FROM node:lts-alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

#Argumentos
ARG ARG_PORT=3000

# baja ultimos fuentes
COPY . .

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN rm -rf node_modules/
RUN npm config set unsafe-perm true
RUN npm cache clean --force
RUN npm install node-pre-gyp node-gyp -g
RUN npm install
RUN npm run build

EXPOSE ${ARG_PORT}

CMD ["npm","start"]
