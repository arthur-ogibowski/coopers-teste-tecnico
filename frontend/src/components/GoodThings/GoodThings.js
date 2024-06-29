import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

import styles from './GoodThings.module.css';
import icon from '../../assets/logo-icon.svg';
import good1 from '../../assets/good1.png';
import good2 from '../../assets/good2.png';
import good3 from '../../assets/good3.png';

const GoodThings = () => {
  // Lista de itens positivos
  const goodThings = [
    { _id: 1, title: 'Organize your daily job enhance your life performance', Image: good1, link: '/' },
    { _id: 2, title: 'Mark one activity as done makes your brain understands the power of doing.', Image: good2, link: '/' },
    { _id: 3, title: 'Careful with missunderstanding the difference between a list of things and a list of desires.', Image: good3, link: '/' },
    { _id: 4, title: 'Organize your daily job enhance your life performance', Image: good1, link: '/' },
    { _id: 5, title: 'Mark one activity as done makes your brain understands the power of doing.', Image: good2, link: '/' },
    { _id: 6, title: 'Careful with missunderstanding the difference between a list of things and a list of desires.', Image: good3, link: '/' },
    { _id: 7, title: 'Organize your daily job enhance your life performance', Image: good1, link: '/' },
    { _id: 8, title: 'Mark one activity as done makes your brain understands the power of doing.', Image: good2, link: '/' },
    { _id: 9, title: 'Careful with missunderstanding the difference between a list of things and a list of desires.', Image: good3, link: '/' },
  ];

  return (
    <section className={styles.goodThings} id="goodThings">
      <div className={styles.header}>
        {/* Fundo do cabeçalho */}
        <div className={styles.headerBackground}></div>
        {/* Título do cabeçalho */}
        <h2 className={styles.headerTitle}>Good Things</h2>
      </div>

      {/* Slider de itens positivos */}
      <Slider 
        className={styles.goodThingsList}
        dots={true}
        arrows={false}
        slidesToShow={3}
        slidesToScroll={3}
        slidesPerRow={1}
        infinite={false}
      >
        {goodThings.map(goodThing => (
          <div key={goodThing._id} className={styles.card}>
            <img src={goodThing.Image} alt={goodThing.title} className={styles.image} />
            <img src={icon} alt="icon" className={styles.icon} />
            {/* Etiqueta de função */}
            <div className={styles.pill}>function</div>
            <div className={styles.cardContent}>
              {/* Título do item positivo */}
              <p className={styles.title}>{goodThing.title}</p>
              {/* Botão para ler mais */}
              <button className={styles.button}>Read more</button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default GoodThings;
