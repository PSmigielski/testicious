
FROM node:14.17.5
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir /api/uploads
RUN npm run build
RUN npx prisma generate