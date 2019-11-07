FROM node:12.2.0-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install --silent --production

COPY . .

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]