#### Backend
# Avaliação Full Stack Developer - Gerenciador de Tarefas com React

Este projeto de backend foi desenvolvido utilizando Node.js, Express.js, MongoDB, e integração com autenticação JWT para gerenciar tarefas.

## Funcionalidades Principais

- **Autenticação de Usuários:**
  - Registro de novos usuários com criptografia de senha usando bcrypt.
  - Login de usuários com geração de token JWT para autenticação.

- **Gerenciamento de Tarefas (Todos):**
  - Endpoint para criar novas tarefas, atualizar, listar e excluir tarefas específicas de cada usuário.
  - Suporte para manipulação de tarefas completas e incompletas.

- **Middleware de Autenticação:**
  - Utilização de middleware para verificar a presença e validade do token JWT em requisições protegidas.

## Rotas e Endpoints

- **POST /api/auth/register:**
  - Cria um novo usuário com username e password. A senha é criptografada antes de ser armazenada no banco de dados.

- **POST /api/auth/login:**
  - Autentica o usuário com base no username e password fornecidos, retornando um token JWT válido por 1 hora.

- **GET /api/todos:**
  - Retorna todas as tarefas pertencentes ao usuário autenticado.

- **POST /api/todos:**
  - Cria uma nova tarefa associada ao usuário autenticado.

- **PUT /api/todos/:id:**
  - Atualiza uma tarefa específica pelo seu ID, desde que pertença ao usuário autenticado.

- **DELETE /api/todos/:id:**
  - Remove uma tarefa específica pelo seu ID, desde que pertença ao usuário autenticado.

- **DELETE /api/todos:**
  - Remove todas as tarefas pertencentes ao usuário autenticado, com base no parâmetro `completed` (opcional).

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express.js:** Framework web para Node.js, facilitando a criação de APIs RESTful.
- **MongoDB:** Banco de dados NoSQL usado para armazenar os dados das tarefas e usuários.
- **Mongoose:** ODM (Object Data Modeling) para MongoDB, fornecendo uma camada de abstração para a interação com o banco de dados.
- **JWT (JSON Web Tokens):** Utilizado para autenticação e autorização, permitindo que os usuários se autentiquem e acessem recursos protegidos.

