import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import AuthModal from './components/Auth/AuthModal';
import Notification from './components/Notification/Notification';
import Todos from './components/Todos/Todos';
import GoodThings from './components/GoodThings/GoodThings';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import './styles/global.css';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false); // Estado para controlar a exibição da modal de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para controlar se o usuário está autenticado
  const [notification, setNotification] = useState({ type: '', message: '' }); // Estado para exibir notificações

  // Função para exibir uma notificação com um tempo determinado
  const showNotification = useCallback((type, message) => {
    const newNotification = { id: Date.now(), type, message };
    setNotification(newNotification);
    setTimeout(() => {
      setNotification({ type: '', message: '' });
    }, 3000);
  }, []);

  // Efeito para verificar o estado de autenticação ao carregar o aplicativo
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    // Verifica se há uma notificação armazenada no localStorage e exibe-a
    const storedNotification = localStorage.getItem('notification');
    if (storedNotification) {
      const { type, message } = JSON.parse(storedNotification);
      showNotification(type, message);
      localStorage.removeItem('notification');
    }
  }, [showNotification]);

  // Função para fechar a modal de autenticação
  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  // Função para abrir a modal de autenticação
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  // Função para fazer logout do usuário
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload(); // Recarrega a página para refletir o estado de logout
  };

  // Função chamada após um login bem-sucedido
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    handleCloseAuthModal();
    setTimeout(() => {
      window.location.reload(); // Recarrega a página para refletir o estado de login
    }, 1000);
    showNotification('success', 'Successfully logged in'); // Exibe uma notificação de sucesso ao logar
  };

  // Função para lidar com erros de autenticação
  const handleAuthError = (message) => {
    showNotification('error', message); // Exibe uma notificação de erro com a mensagem fornecida
  };

  // Função chamada após um registro bem-sucedido
  const handleRegisterSuccess = () => {
    showNotification('success', 'Successfully registered'); // Exibe uma notificação de sucesso ao registrar
  };

  return (
    <Router>
      <div id="app">
        {/* Barra de navegação */}
        <Nav isAuthenticated={isAuthenticated} onLoginClick={handleLoginClick} onLogoutClick={handleLogoutClick} />
        
        {/* Modal de autenticação */}
        <AuthModal show={showAuthModal} handleClose={handleCloseAuthModal} onLoginSuccess={handleLoginSuccess} onAuthError={handleAuthError} onRegisterSuccess={handleRegisterSuccess} />
        
        {/* Componente de destaque (Hero) */}
        <Hero />
        
        {/* Componente de Tarefas (Todos) */}
        <Todos onLoginClick={handleLoginClick} showNotification={showNotification} />
        
        {/* Componente de Coisas Boas (GoodThings) */}
        <GoodThings />
        
        {/* Componente de Contato (Contact) */}
        <Contact showNotification={showNotification} />
        
        {/* Componente de Notificação */}
        <Notification message={notification.message} type={notification.type} />
      </div>
      
      {/* Rodapé */}
      <Footer />
    </Router>
  );
};

export default App;
