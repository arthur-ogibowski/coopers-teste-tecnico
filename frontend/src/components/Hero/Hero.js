import React from 'react';
import HeroImage from '../../assets/hero.png';
import HeroGraphic from '../../assets/hero-graphic.svg';
import IconScroll from '../../assets/icon-scroll.svg';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                {/* Gráfico do hero */}
                <img src={HeroGraphic} alt="hero-graphic" className={styles.heroGraphic} />
                <div className={styles.heroText}>
                    {/* Título do hero */}
                    <h1 className={styles.heroTitle}>Organize <span className={styles.titleSpan}>your daily jobs</span></h1>
                    {/* Descrição do hero */}
                    <p className={styles.heroDescription}>The only way to get things done</p>
                    {/* Botão do hero para ir para a lista de tarefas */}
                    <button className={styles.heroButton} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>Go to To-do list</button>
                </div>
                {/* Imagem do hero */}
                <img src={HeroImage} alt="hero" className={styles.heroImage} />
            </div>
            {/* Ícone de rolagem para baixo */}
            <img src={IconScroll} alt="scroll" className={styles.iconScroll} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} />
        </section>
    );
}

export default Hero;
