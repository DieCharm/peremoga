import React, {useContext} from 'react';
import styles from "./footer.module.scss";
import {developer_texts} from "../../../../texts/layout_texts";
import {AppContext} from "../../../../context";

const Footer = () => {

    const {lang} = useContext(AppContext);

    return (
        <div className={styles.footer}>
            <div className={styles.copyrightWrapper}>
                <span className={styles.copyright}>Перемога © 2023</span>
            </div>
            <div className={styles.socialsWrapper}>
                <div className={styles.socials}>
                    <a
                        className={styles.phone}
                        href="tel:+380982723535" />
                    <a
                        className={styles.gmail}
                        href="mailto:pobeda.darnica@gmail.com" />
                    <a
                        className={styles.instagram}
                        href="https://www.instagram.com/" />
                    <a
                        className={styles.facebook}
                        href="https://www.facebook.com/" />
                </div>
            </div>
            <div className={styles.developerWrapper}>
                <a href="https://github.com/DieCharm/">
                    <div className={styles.developer}>
                        {developer_texts[lang].split("").map((char, index) =>
                            <div
                                key={index}
                                className={styles[`charWrapper${developer_texts[lang].length === 11 ? index : index + 1}`]}>
                                {char}
                            </div>)}
                        <div className={styles.github} />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Footer;
