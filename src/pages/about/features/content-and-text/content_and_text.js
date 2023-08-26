import React from 'react';
import styles from "./content_and_text.module.scss";

const ContentAndText = ({content, header, text, inverse = false}) => {
    return (
        <div className={styles.contentAndTextContainer}>
            {
                inverse
                    ?
                    <>
                        <div className={styles.contentWrapperLeft}>
                            {content}
                        </div>
                        <div className={styles.textWrapperRight}>
                            <h2>{header}</h2>
                            <p>{text}</p>
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.textWrapperLeft}>
                            <h2>{header}</h2>
                            <p>{text}</p>
                        </div>
                        <div className={styles.contentWrapperRight}>
                            {content}
                        </div>
                    </>
            }
        </div>
    );
};

export default ContentAndText;