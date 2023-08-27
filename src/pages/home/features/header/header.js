import React, {useContext} from 'react';
import styles from "./header.module.scss";
import {home_texts} from "../../../../texts/home_texts";
import {AppContext} from "../../../../context";
import AnimatedContentSwitcher from "../../../../common/animated-content-switcher/animated_content_switcher";

const Header = React.memo(() => {

    const {lang} = useContext(AppContext);
    const elements = Object.keys(home_texts).map(key =>
        <p>{home_texts[key][lang]}</p>);

    return (
        <div className={styles.headerContainer}>
            <h1>peremoga hall</h1>
            <AnimatedContentSwitcher
                elements={elements}
                switch_timeout={2000}
                enter_class={styles.textSlideIn}
                exit_class={styles.textSlideOut} />
        </div>
    );
});

export default Header;