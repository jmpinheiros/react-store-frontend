# Use a imagem oficial do Nginx como base
FROM nginx:stable-alpine

# Copie o arquivo de configuração do Nginx para o diretório padrão do Nginx
COPY /docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Copie a pasta build do contêiner React para o diretório padrão do Nginx
COPY --from=store-store /store/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Defina a porta padrão que o contêiner deve ouvir
CMD ["nginx", "-g", "daemon off;"]