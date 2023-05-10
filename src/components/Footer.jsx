import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className={ styles.footer }
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt=""
          data-testid="drinks-bottom-btn"
          name="drinks"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt=""
          data-testid="meals-bottom-btn"
          name="meals"
        />
      </Link>
    </footer>
  );
}
