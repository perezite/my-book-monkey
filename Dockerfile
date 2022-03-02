# Stage 1
FROM node:12-buster as node
RUN npm install -g @angular/cli@10
# Google Chrome installieren
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update && apt-get install -yq google-chrome-stable
# Die Tests ausführen und die Anwendung bauen
WORKDIR /usr/src/app
COPY . ./
RUN npm install
# RUN ng test --watch=false --browsers=ChromeHeadlessNoSandbox
RUN ng build --prod
# Start: Stage 2
FROM nginx
LABEL maintainer="Prez Prez prez@prez.com"
COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=node /usr/src/app/dist/book-monkey /usr/share/nginx/html
