#
FROM node:16.9.0
COPY ./* /app
WORKDIR /app
RUN npm install
RUN npm run build
ENTRYPOINT ["npm", "start"]