import axios from 'axios';

const backendUrl = 'https://enigmatic-harbor-98544-3afc102bbefd.herokuapp.com/'

const token = localStorage.getItem('token');

// Função para obter todos os todos
const getTodos = async () => {
  try {
    const response = await axios.get(`${backendUrl}api/todos`, {
      headers: { 'x-auth-token': token }, // Define o token de autenticação no cabeçalho da requisição
    });
    return response.data; // Retorna os dados dos todos obtidos da API
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Função para adicionar um novo todo
const addTodo = async (title, isNewTodoCompleted) => {
  try {
    const response = await axios.post(
      `${backendUrl}api/todos`,
      { title, completed: isNewTodoCompleted },
      {
        headers: { 'x-auth-token': token }, // Define o token de autenticação no cabeçalho da requisição
      }
    );
    return response.data; // Retorna os dados do novo todo adicionado
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Função para deletar um todo
const deleteTodo = async (id) => {
  try {
    await axios.delete(`${backendUrl}api/todos/${id}`, {
      headers: { 'x-auth-token': token }, // Define o token de autenticação no cabeçalho da requisição
    });
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Função para alternar o status de completo/incompleto de um todo
const toggleCompleteTodo = async (id, todo) => {
  try {
    const response = await axios.put(
      `${backendUrl}api/todos/${id}`,
      {
        ...todo,
        completed: !todo.completed, // Inverte o status de completo do todo
      },
      {
        headers: { 'x-auth-token': token }, // Define o token de autenticação no cabeçalho da requisição
      }
    );
    return response.data; // Retorna os dados do todo com o status atualizado
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Função para atualizar a ordem e/ou completude de um todo
const updateTodoOrder = async (id, draggedTodo, isCompleted) => {
  try {
    const response = await axios.put(
      `${backendUrl}api/todos/${id}`,
      {
        ...draggedTodo,
        completed: isCompleted, // Define o status de completude do todo conforme especificado
      },
      {
        headers: { 'x-auth-token': token }, // Define o token de autenticação no cabeçalho da requisição
      }
    );
    return response.data; // Retorna os dados do todo com a ordem/atualização aplicada
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Função para atualizar o título de um todo
const updateTodoTitle = async (id, title) => {
  try {
    const response = await axios.put(
      `${backendUrl}api/todos/${id}`,
      {
        title,
      },
      {
        headers: { 'x-auth-token': token }, // Define o token de autenticação no cabeçalho da requisição
      }
    );
    return response.data; // Retorna os dados do todo com o título atualizado
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Função para limpar todos os todos completos ou incompletos
const clearTodos = async (completed) => {
  try {
    await axios.delete(`${backendUrl}api/todos`, {
      headers: { 'x-auth-token': token }, // Define o token de autenticação no cabeçalho da requisição
      params: { completed }, // Define os parâmetros da requisição para limpar todos baseado no status de completude
    });
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Exporta todas as funções para serem utilizadas em outros arquivos
export {
  getTodos,
  addTodo,
  deleteTodo,
  toggleCompleteTodo,
  updateTodoOrder,
  updateTodoTitle,
  clearTodos,
};
