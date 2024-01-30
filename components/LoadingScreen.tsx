'use client';

import React from 'react';
import styles from '../styles/loadingScreen.module.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Loading...</h2>
    </div>
  );
};

export default LoadingScreen;