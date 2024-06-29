import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.background}/>
                <h1 className={styles.mainTitle}>
                    Need help?
                </h1>
                <h1 className={styles.secondTitle}>
                    coopers@coopers.pro
                </h1>
                <p className={styles.text}>
                    &copy; 2021 Coopers. All rights reserved.
                </p>
                <div className={styles.graphic}/>
            </div>
        </footer>
    );
};

export default Footer;