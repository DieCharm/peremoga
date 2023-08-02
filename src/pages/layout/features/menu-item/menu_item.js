import React, {useState} from 'react';
import styles from "./menu_item.module.css";

const MenuItem = ({text, callback}) => {

    const [underline_active, set_underline_active] = useState(false);

    return (
        <div
            className={styles.container}
            onClick={callback}
            onMouseEnter={() => set_underline_active(true)}
            onMouseLeave={() => set_underline_active(false)}>
            <span className={styles.menuItemText}>{text}</span>
            <div className={styles.menuItemUnderlineContainer}>
                <div className={[
                    styles.menuItemUnderlineInactive,
                    (underline_active ? styles.menuItemUnderlineActive : "")].join(" ")}/>
            </div>
        </div>
    );
};

export default MenuItem;
