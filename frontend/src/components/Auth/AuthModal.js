import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Notification from '../Notification/Notification';
import styles from './AuthModal.module.css';
import authImg from '../../assets/auth.png';

const AuthModal = ({ show, handleClose, onLoginSuccess, onAuthError, onRegisterSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Função para alternar entre os modos de login e registro
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Resetar notificação ao alternar os modos
    setNotification({ message: '', type: '' });
  };

  // Função para resetar o modo de autenticação para login
  const resetAuthMode = () => {
    setIsLogin(true);
  };

  // Função para lidar com o fechamento do modal com animação de fechamento
  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      handleClose();
      setIsClosing(false);
      resetAuthMode();
    }, 300);
  };

  // Resetar a animação de fechamento quando o modal for mostrado novamente
  useEffect(() => {
    setIsClosing(false);
  }, [show]);

  return (
    show && (
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
        <div className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
          <button className={styles.close} onClick={handleModalClose} aria-label="Close modal">Close</button>
          <div className={styles.content}>
            <div className={styles.header}>
              <img src={authImg} alt="Auth" />
              <h1 id="authModalTitle" className={styles.title}>
                {isLogin ? 'Sign in' : 'Register'}
                <span className={styles.titleSpan}>
                  {isLogin ? 'to access your list' : 'to start creating'}
                </span>
              </h1>
            </div>
            {/* Renderizar o componente de login ou registro com base no modo atual */}
            {isLogin ? (
              <Login handleClose={handleModalClose} onLoginSuccess={onLoginSuccess} onAuthError={onAuthError} setNotification={setNotification} />
            ) : (
              <Register handleClose={handleModalClose} resetAuthModal={resetAuthMode} onRegisterSuccess={onRegisterSuccess} onAuthError={onAuthError} setNotification={setNotification} />
            )}
          </div>
          <footer className={styles.footer}>
            {isLogin ? 'New to Coopers? ' : 'Already have an account? '}
            <button onClick={toggleAuthMode} className={styles.footerButton} type="button">
              {isLogin ? 'Register' : 'Sign in'}
            </button>
          </footer>
        </div>
        {/* Renderizar a notificação */}
        {notification.message && <Notification message={notification.message} type={notification.type} />}
      </div>
    )
  );
};

export default AuthModal;
