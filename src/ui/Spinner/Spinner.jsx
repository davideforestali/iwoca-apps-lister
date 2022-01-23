import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({
  className = ''
}) => (
    <div className={`${styles.Spinner} ${styles[className]}`}>Loading...</div>
)

export default Spinner;