FROM node:18

WORKDIR /usr/src/app

# Copie o arquivo .yarnrc.yml antes de copiar o package.json e yarn.lock
COPY .yarnrc.yml ./

# Copie o package.json e yarn.lock para instalar as dependências
COPY package.json yarn.lock ./

# Instale as dependências usando o yarn
RUN yarn

# Copie todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Comando padrão para executar o servidor
CMD ["yarn", "run", "dev"]
