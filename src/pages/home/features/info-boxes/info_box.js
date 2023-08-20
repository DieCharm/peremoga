import React from 'react';
import styles from "./info-boxes.module.scss";

const InfoBox = ({index, name, image, text}) => {
    return (
        <div
            style={{backgroundImage: `url(${image})`}}
            className={[styles.box, styles[`box${index + 1}`]].join(" ")}>
            <div className={styles.boxBg}>
                <h3>{name}</h3>
                <div className={styles.textWrapper}>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
};

export default InfoBox;