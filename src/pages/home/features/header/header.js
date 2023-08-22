import React, {useContext} from 'react';
import styles from "./header.module.scss";
import {home_texts} from "../../../../texts/home_texts";
import {AppContext} from "../../../../context";
import AnimatedContentSwitcher from "../../../../common/animated-content-switcher/animated_content_switcher";

const Header = React.memo(() => {

    const {lang} = useContext(AppContext);
    const texts = ["subHeader0", "subHeader1", "subHeader2"];
    const elements = texts.map(text => <p>{home_texts[text][lang]}</p>)

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