# Dockerfile
FROM node:12

WORKDIR $HOME

COPY package*.json ./

# Instalamos angular cli en nuestra imágen
RUN npm install 

COPY . .

CMD ["node", "index.js"]
