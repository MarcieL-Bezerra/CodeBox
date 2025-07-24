FROM node:18

# Instalar Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Instalar JDK
RUN apt-get install -y openjdk-17-jdk

# Verificar se o Java foi instalado corretamente
RUN java -version

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]