import React, {useState} from 'react';
import styles from "./underlinable_link.module.scss";

const UnderlinableLink = ({element, callback = () => {}, underline_width = 100}) => {

    const [underline_active, set_underline_active] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div
                onClick={callback}
                onMouseEnter={() => set_underline_active(true)}
                onMouseLeave={() => set_underline_active(false)}>
                {element}
            </div>
            <div
                className={styles.itemUnderlineContainer}
                style={{width: `${underline_width}%`}}>
                <div
                    className={underline_active
                        ? styles.itemUnderlineActive
                        : styles.itemUnderlineInactive} />
            </div>
        </div>
    );
};

export default UnderlinableLink;
