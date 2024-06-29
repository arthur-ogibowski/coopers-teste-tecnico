import axios from 'axios';

const backendUrl = 'https://enigmatic-harbor-98544-3afc102bbefd.herokuapp.com/';

// Função para registrar o usuário
const registerUser = async (username, password) => {
  try {
    await axios.post(`${backendUrl}api/auth/register`, { username , password });
  } catch (error) {
    console.log(error);
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

// Função para fazer login do usuário
const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${backendUrl}api/auth/login`, { username, password });
    localStorage.setItem('token', response.data.token); // Armazena o token de autenticação no localStorage
  } catch (error) {
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
};

export { registerUser, loginUser };
