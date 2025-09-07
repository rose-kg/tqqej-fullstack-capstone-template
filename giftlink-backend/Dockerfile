FROM node:18

WORKDIR /usr/src/app

# Copy backend package files
COPY giftlink-backend/package*.json ./
RUN npm install

# Copy backend source files
COPY giftlink-backend/ ./

# Copy frontend build files
COPY giftlink-frontend/build ./frontend-build

EXPOSE 3060

CMD ["node", "app.js"]
