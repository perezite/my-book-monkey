FROM nginx
LABEL maintainer="Prez Prez prez@prez.com"
COPY nginx/default.conf /etc/nginx/conf.d
COPY dist/book-monkey /usr/share/nginx/html