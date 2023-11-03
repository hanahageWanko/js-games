
FROM node:lts-bullseye-slim
# EXPOSE 3001

COPY package*.json ./
COPY .env ./
RUN npm ci
RUN npm install --save-dev webpack webpack-cli