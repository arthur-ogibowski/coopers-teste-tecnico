import React, { useState } from 'react';
import { loginUser } from '../../utils/auth';
import styles from './AuthModal.module.css';

const Login = ({ onLoginSuccess, onAuthError, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chamar a função de login assíncrona
      await loginUser(username, password, setNotification);
      // Executar callback de sucesso no login
      onLoginSuccess();
    } catch (error) {
      // Lidar com erros de autenticação
      onAuthError(error.response.data.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>User</label>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Usuário"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Senha"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
