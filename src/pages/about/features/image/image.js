import React from 'react';
import styles from "./image.module.scss";

const Image = ({image_path}) => {
    return (
        <div
            className={styles.imageContainer}
            style={{backgroundImage: `url(${image_path})`}} />
    );
};

export default Image;