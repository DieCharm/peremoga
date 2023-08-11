import React, {useContext} from 'react';
import styles from "./footer.module.css";
import {developed_texts} from "../../../../texts/layout_texts";
import {AppContext} from "../../../../context";

const Footer = () => {

    const {lang} = useContext(AppContext);

    return (
        <div className={styles.footer}>
            <div>
                <span className={styles.copyright}>Перемога © 2023</span>
            </div>
            <div className={styles.linksWrapper}>
                <div className={styles.socialWrapper}>
                    <a
                        className={[styles.socialIcon, styles.phone].join(" ")}
                        href="tel:+380680757509" />
                    <a
                        className={[styles.socialIcon, styles.gmail].join(" ")}
                        href="mailto:pobeda.darnica@gmail.com" />
                    <a
                        className={[styles.socialIcon, styles.instagram].join(" ")}
                        href="https://www.instagram.com/" />
                    <a
                        className={[styles.socialIcon, styles.facebook].join(" ")}
                        href="https://www.facebook.com/" />
                </div>
            </div>
            <div className={styles.developerWrapper}>
                <span>{developed_texts[lang]}</span>
                <a
                    className={[styles.socialIcon, styles.github].join(" ")}
                    href="https://github.com/DieCharm/" />
            </div>
        </div>
    );
};

export default Footer;