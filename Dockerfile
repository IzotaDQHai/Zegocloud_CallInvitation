FROM node:20-alpine as build

WORKDIR /app

ARG REACT_APP_APP_ID=1347806305
ARG REACT_APP_SERVER_SECRET=e4143598b8c8bbbcc81ef33d2130dcc8
ARG REACT_APP_APP_TOKEN=04AAAAAGXlOUIAEDQ4YWM4MmMzYWUwNGM4ODAAgFCMEyeqM8lZij03NzXAfcByCCjSZAESiy2rNCUn4mSaoDYfhjXs6ZN2zFpG7EGHBzDLb2jSPHtwIE4WU+2pF8yQ0uYExMuf9DoltFl0Ll/YgZfzGasT1ujDrefr0vDod5ACTRyXta23RBp9SSemUKurQpoTwR5ja1Q1AtUnUT28
COPY . .
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]