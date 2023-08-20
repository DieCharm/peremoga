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
                            <h1>{header}</h1>
                            <p>{text}</p>
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.textWrapperLeft}>
                            <h1>{header}</h1>
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