# Use a imagem Node como base
FROM node:14

# Definir o diretório de trabalho
WORKDIR /store

# Copie o arquivo package.json para o contêiner
COPY package.json ./

# Instale as dependências do seu aplicativo
RUN npm install

# Copie todos os outros arquivos para o contêiner
COPY . .

# Execute o comando para construir a aplicação React
RUN npm run build

# Execute o comando para iniciar o aplicativo se fosse para dev
#CMD [ "npm", "start" ]

# Sem docker-compose criariamos a imagem assim
#docker build -t <nome_da_imagem> .

#docker run -p 3000:3000 <nome_da_imagem>
