'use client';

import React from 'react';
import styles from '../styles/loadingScreen.module.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingContent}>
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;