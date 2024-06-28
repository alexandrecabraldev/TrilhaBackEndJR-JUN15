# TASK LIST API

Este é o backend de uma lista de tarefas, desenvolvido utilizando Nodejs, Express e Sqlite. O projeto fornece APIs para autenticação, gerenciamento de usuários e suas tarefas.

# Deploy da aplicação da aplicação

O Deploy dessa aplicação se encontra em https://trilhabackendjr-jun15.onrender.com

## Requisitos

- Nodejs
- Express
- Prisma
- bcrypt library
- jsonwebtoken library
- uuid library
- zod library
- dotenv

## Instalação

1. Clone o repositório:

    ```plaintext
    git clone https://github.com/alexandrecabraldev/TrilhaBackEndJR-JUN15
    ```

2. Entre nas pasta TrilhaBackEndJR-JUN15:
    Essa é a pasta onde está o projeto:

    ```plaintext
    cd TrilhaBackEndJR-JUN15
    ```
3. Instale as dependencias:

    ```plaintext
    npm install / yarn install ou qualquer outro de sua preferência
    ```
4. Rode as migrations do prisma:

    ```plaintext
    npx prisma migrate dev --schema=./src/models/prisma/schema.prisma
    ```
5. Preencha as variáveis de ambiente de acordo com o arquivo .env.example

## Executando o Projeto

1. Inicie o servidor:

    ```plaintext
    npm run dev
    ```

2. O servidor estará rodando em [http://localhost:3000], ou na porta definida pela variável ambiente PORT.

## Estrutura do Projeto


```plaintext
   project-root/
   │
   ├── src/
   │   ├── controllers/
   │   ├── models/
   │   ├── routes/
   │   ├── middlewares/
   │   ├── database/
   │   ├── app.ts
   |   └── dotenvConfig.ts
   │
   ├── .env
   ├── .gitignore
   ├── README.md
   ├── tsconfig.json
   └── package.json
   ```


## Endpoints Principais

### Autenticação

- `POST /login`: Autentica um usuário.
- `POST /user/create`: Cadastra um novo usuário.

### Gerenciamento de Usuários

- `GET /user/:id`: Retorna um usuário em específico.
- `PUT /user/update/:id`: Atualiza as informações do usuário.

### Gerenciamento de Tarefas

- `POST /task/create`: Cria uma tarefa.
- `GET /task/read`: Retorna uma lista com todas as tarefas do usuário.
- `PUT /task/update/:id`: Atualiza as informações de uma tarefa específica.
- `DELETE /task/delete/:id`: Deleta as informações de uma tarefa específica.

### Dinâmica

- Um usuário pode ser criado sem a necessidade de estar autenticado, essa rota é aberta:
    **userName, email, password são necessários para criar um usuário

- Para todas as outras rotas uma autenticação com email e senha é necessário.

- As informações para criação de tarefas são: 
    **title, description, due_date, sendo due_date a data máxima para realização da tarefa e podendo ser preenchida apenas com a data no padrão "yyyy-mm-dd".

### Observação

- Também existe a possibilidade de testar usando algum client HTTP de sua escolha como: Insomnia, Postman, HTTPie, etc.