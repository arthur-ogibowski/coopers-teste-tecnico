import React, { useState } from 'react';
import { registerUser } from '../../utils/auth';
import styles from './AuthModal.module.css';

const Register = ({ resetAuthModal, onRegisterSuccess, onAuthError, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para lidar com o envio do formulário de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chamar a função de registro assíncrona
      await registerUser(username, password, setNotification);
      // Executar callbacks de sucesso no registro e resetar o modal de autenticação
      onRegisterSuccess();
      resetAuthModal();
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
