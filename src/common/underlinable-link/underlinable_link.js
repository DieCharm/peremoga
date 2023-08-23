import React, {useState} from 'react';
import styles from "./underlinable_link.module.scss";

const UnderlinableLink = ({text, callback = () => {}}) => {

    const [underline_active, set_underline_active] = useState(false);

    return (
        <div>
            <span
                className={styles.itemText}
                onClick={callback}
                onMouseEnter={() => set_underline_active(true)}
                onMouseLeave={() => set_underline_active(false)}>
                {text}
            </span>
            <div className={styles.itemUnderlineContainer}>
                <div
                    className={underline_active
                        ? styles.itemUnderlineActive
                        : styles.itemUnderlineInactive}/>
            </div>
        </div>
    );
};

export default UnderlinableLink;
