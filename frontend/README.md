#### Frontend
# Avaliação Full Stack Developer - Gerenciador de Tarefas com React

Este projeto é uma aplicação web desenvolvida com React, focada no gerenciamento de tarefas (todos), autenticação de usuários e notificações. Ele inclui componentes principais como Nav, Hero, AuthModal, Notification, Todos, GoodThings, Contact e Footer.

## Funcionalidades Principais

### Autenticação de Usuários

- Os usuários podem se registrar e fazer login para acessar funcionalidades exclusivas.
- Utilização de tokens JWT para autenticação, armazenados no localStorage do navegador.

### Gerenciamento de Tarefas (Todos)

- Adicionar, remover, editar e marcar tarefas como completas.
- Arrastar e soltar para reordenar as tarefas.
- Divisão das tarefas em completas e incompletas.

### Notificações

- Exibição de notificações para feedback ao usuário após ações como adicionar, editar, excluir tarefas, login bem-sucedido, etc.
- Notificações são armazenadas temporariamente no localStorage para persistência entre páginas.

### Componentes

- **Nav:** Barra de navegação que muda de acordo com o estado de autenticação do usuário.
- **Hero:** Componente principal da página inicial.
- **AuthModal:** Modal para login e registro de usuários.
- **Notification:** Componente para exibir notificações ao usuário.
- **Todos:** Gerencia a exibição e manipulação das listas de tarefas.
- **GoodThings:** Seção opcional para listar conquistas ou eventos positivos.
- **Contact:** Formulário de contato.
- **Footer:** Rodapé da página.

## Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router:** Para navegação entre páginas dentro da aplicação.
- **Axios:** Cliente HTTP baseado em Promises para fazer requisições à API.
- **CSS Modules:** Estilos modulares para componentes React.
- **React Beautiful DnD:** Biblioteca para arrastar e soltar elementos para reordenar tarefas.
- **Slick Carousel:** Carrossel de imagens para a seção GoodThings.
- **EmailJs:** Serviço de envio de e-mails para o formulário de contato.