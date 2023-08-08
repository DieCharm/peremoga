import React from 'react';
import styles from "../info-boxes.module.css";

const InfoBox = ({name, image, text}) => {
    return (
        <div className={styles.box}>
            <img src={image} alt={name} />
        </div>
    );
};

export default InfoBox;