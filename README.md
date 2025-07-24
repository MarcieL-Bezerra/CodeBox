## CodeBox

### Índice

- Sobre-o-projeto
- Requisitos
- Rodando-localmente
- Rodando-com-docker
- Comandos-úteis

### Sobre o Projeto

- O CodeBox é uma aplicação web que emula um copilador para execução de códigos direto no navegador.

### Requisitos

- Node.js 18 ou superior
- npm 8 ou superior

### Rodando Localmente

- Para rodar o projeto localmente, siga os passos abaixo:

    1. Clone o repositório: git clone https://github.com/MarcieL-Bezerra/CodeBox.git
    2. Instale as dependências: npm install
    3. Inicie o servidor: node server.js
    4. Acesse o projeto em: http://localhost:3000

### Rodando com Docker

- Para rodar o projeto com Docker, siga os passos abaixo:

    1. Clone o repositório: git clone https://github.com/MarcieL-Bezerra/CodeBox.git
    2. Construa a imagem Docker: docker build -t codebox .
    3. Execute o container: docker run -p 3000:3000 codebox
    4. Acesse o projeto em: http://localhost:3000

- Comandos Úteis
    ```docker
    docker build -t codebox . 
    docker run -p 3000:3000 codebox
    docker run --rm -p 3000:3000 codebox
    ```
# V1.0.0:
- Lançamento inicial do projeto suporte a Linguagem Python.
- Implementação das funcionalidades básicas.
- Suporte a Docker.
# V1.1.0:
- Adicionado suporte a Linguagem Java.
