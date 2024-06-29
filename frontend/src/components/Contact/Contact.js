import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import styles from './Contact.module.css';
import contactImage from '../../assets/contact.png';
import mail from '../../assets/mail.svg';

const Contact = ({ showNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  useEffect(() => {
    // Inicializa o emailjs com o ID do usuário fornecido no ambiente
    emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Formata o número de telefone como (**) *****-****
    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove todos os caracteres não numéricos
    let formatted = phoneNumber.replace(/\D/g, '');

    // Aplica a formatação: (00) 00000-0000
    const regex = /^(\d{2})(\d{5})(\d{4})$/;
    formatted = formatted.replace(regex, '($1) $2-$3');

    // Limita a 15 caracteres (incluindo formatação)
    return formatted.slice(0, 15);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true });

    try {
      // Envia o formulário usando o emailjs
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_USER_ID
      );
      // Atualiza o estado após o envio bem-sucedido
      setFormStatus({ ...formStatus, submitting: false, submitted: true });
      // Mostra uma notificação de sucesso
      showNotification('success', 'Your message has been sent!');
    } catch (err) {
      // Trata erros durante o envio do formulário
      setFormStatus({ ...formStatus, submitting: false, error: true });
      // Mostra uma notificação de erro
      showNotification('error', 'There was an error sending your message. Please try again.');
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <div className={styles.graphic} />
          <img src={contactImage} alt="Contact" className={styles.headerImage} />
        </div>

        <div className={styles.getInTouch}>
          <img src={mail} alt="Mail" className={styles.getInTouchIcon} />
          <h2 className={styles.getInTouchTitle}>
            Get in <span className={styles.getInTouchTitleAccent}>touch</span>
          </h2>
        </div>

        <div className={styles.formItem}>
          <label htmlFor="name" className={styles.label}>
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Type your name here..."
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formItem}>
            <label htmlFor="email" className={styles.label}>
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="example@example.com"
            />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="phone" className={styles.label}>
              Telephone*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="(   ) _____-____"
              maxLength="15"
            />
          </div>
        </div>

        <div className={styles.formItem}>
          <label htmlFor="message" className={styles.label}>
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Type what you want to say to us"
          />
        </div>

        <button type="submit" className={styles.submit} disabled={formStatus.submitting}>
          {formStatus.submitting ? 'Sending...' : 'Send now'}
        </button>
      </form>
    </section>
  );
};

export default Contact;
