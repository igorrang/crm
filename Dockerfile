# 1. Escolha uma imagem base com Node.js
FROM node:18-alpine

# 2. Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia o arquivo package.json e lockfile para o diretório de trabalho
COPY package.json yarn.lock ./ 

# 4. Instala as dependências do projeto
RUN yarn install --frozen-lockfile

# 5. Copia todos os arquivos da aplicação para o diretório de trabalho
COPY . .

# 6. Constrói a aplicação Next.js para produção
RUN yarn build

# 7. Expõe a porta que a aplicação Next.js vai rodar (por padrão 3000)
EXPOSE 3000

# 8. Comando para rodar a aplicação em modo de produção
CMD ["yarn", "start"]