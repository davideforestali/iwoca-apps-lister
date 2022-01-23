import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({
  className = ''
}) => (
    <div
      role='alert'
      aria-label='loading'
      className={`${styles.Spinner} ${styles[className]}`}
    />
)

export default Spinner;