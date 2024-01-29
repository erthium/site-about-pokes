import React from 'react';
import styles from '../styles/footer.module.css';

const Footer: React.FC = () => {
    const contactLink: string = "https://github.com/ErtyumPX";
    const emailAddress: string = "ertugrul.a.senturk@gmail.com";
    return(
        <div className={styles.container}>
            <p className={styles.copyrightText}>Copyright © 2024 Erthium</p>
            <p className={styles.nintendoFunnyThingy}>Pokemon and Pokemon character names are trademarks of Nintendo</p>
            <div className={styles.linkContainer}>
                <a className={styles.link} href={contactLink}>Website</a> 
                <a className={styles.link} href={emailAddress}>Contact</a>
            </div>
        </div>
    )
};

export default Footer;
