FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN addgroup -g 1001 -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

ENV PORT=4000
ENV APP_DB_URL=mongodb+srv://backend_user:mahdi010101@cluster0.65njice.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV APP_JWT_SECRET="wgSS4Zb7Nuc3b8uCQDJUYXw77be07g+kkUtgqsbXjbU="

EXPOSE 4000

CMD ["node", "app.js"]