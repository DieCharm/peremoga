import React, {useState} from 'react';
import styles from "./underlinable_link.module.scss";

const UnderlinableLink = ({text, callback = () => {}}) => {

    const [underline_active, set_underline_active] = useState(false);

    return (
        <div>
            <span
                className={styles.menuItemText}
                onClick={callback}
                onMouseEnter={() => set_underline_active(true)}
                onMouseLeave={() => set_underline_active(false)}>
                {text}
            </span>
            <div className={styles.menuItemUnderlineContainer}>
                <div
                    className={[
                    styles.menuItemUnderlineInactive,
                    (underline_active ? styles.menuItemUnderlineActive : "")
                    ].join(" ")}/>
            </div>
        </div>
    );
};

export default UnderlinableLink;
