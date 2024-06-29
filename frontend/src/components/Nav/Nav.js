import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import styles from './Nav.module.css';

const Nav = ({ isAuthenticated, onLoginClick, onLogoutClick }) => {
    return (
        <nav className={styles.nav}>
            {/* Link para a página inicial */}
            <Link to="/">
                <img src={Logo} alt="logo" className={styles.logo} />
            </Link>
            <div>
                {/* Botão de logout se autenticado, senão botão de login */}
                {isAuthenticated ? (
                    <button onClick={onLogoutClick} className={styles.logoutButton}>Logout</button>
                ) : (
                    <button onClick={onLoginClick} className={styles.loginButton}>Login</button>
                )}
            </div>
        </nav>
    );
}

export default Nav;
