import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Monitora a propriedade message para exibir a notificação 
  // e escondê-la após 3 segundos
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [message]);

  // Edge case: se isVisible for false, retorna null
  if (!isVisible) {
    return null;
  }

  // Renderiza a notificação se isVisible for true
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
