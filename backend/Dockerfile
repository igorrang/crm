# Usando a imagem Node.js versão 20 baseada em Alpine
FROM node:20-alpine AS builder



# Definindo o diretório de trabalho
WORKDIR /src

# Copiando todos os arquivos da aplicação e ajustando permissões
COPY --chown=node:node . .

# Instalando dependências do projeto
RUN npm install

COPY --chown=node:node /ecosystem.config.js /ecosystem.config.js
# Instalando PM2 globalmente
RUN npm install -g pm2

# Usando PM2 para executar a aplicação em modo de produção
COPY . .

# Usando PM2 para executar a aplicação em modo de produção
CMD ["pm2-runtime",  "./src/server.js"]