FROM nginx:alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh nodejs nodejs-npm

# baja ultimos fuentes
COPY . .

RUN npm install -g @angular/cli

RUN npm install
RUN npm rebuild node-sass --force
RUN ng build --prod

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
RUN mv -f dist/frontend/* /usr/share/nginx/html/
RUN ls -ltr /usr/share/nginx/html/

#Argumentos
ARG ARG_PORT=80

#Variables de ambiente
ENV PORT=${ARG_PORT}

EXPOSE ${ARG_PORT}

CMD ["nginx", "-g", "daemon off;"]
