FROM node:lts-slim
WORKDIR /app
COPY . .
ENV DB_PASS "nodedan"
ENV DB_USER "nodedan"
ENV DB_NAME "nodedan"
ENV DB_PORT "5432"
ENV HOST_IP "192.168.1.155"
ENV DATABASE_URL "postgresql://${DB_USER}:${DB_PASS}@${HOST_IP}:${DB_PORT}/${DB_NAME}?schema=public"
ENV PGADMIN_EMAIL "nicolasgoux2000@gmail.com"
ENV PGADMIN_PASSWORD "nodedan"
ENV PGADMIN_PORT "8032"
RUN apt-get update -y
RUN apt-get install -y openssl
RUN npm install
RUN npx prisma generate
CMD ["npm", "run", "dev"]
EXPOSE 3030