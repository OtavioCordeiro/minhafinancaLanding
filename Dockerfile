FROM node:20-alpine AS build

ARG PUBLIC_API_URL
ARG PUBLIC_APP_URL
ARG PUBLIC_GOOGLE_CLIENT_ID
ARG BACKEND_TARGET

ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV PUBLIC_APP_URL=$PUBLIC_APP_URL
ENV PUBLIC_GOOGLE_CLIENT_ID=$PUBLIC_GOOGLE_CLIENT_ID
ENV BACKEND_TARGET=$BACKEND_TARGET

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
