import React from 'react';
import styles from "./picture.module.css";
import AnimatedContentSwitcher from "../../../../common/animated-content-switcher/animated_content_switcher";

const Picture = React.memo(() => {

    const bgStyles = [styles.bg0, styles.bg1, styles.bg2, styles.bg3];
    const elements = bgStyles.map(bg_style => <div className={[styles.picture, bg_style].join(" ")} />)

    return (
        <AnimatedContentSwitcher
            elements={elements}
            switch_timeout={5000}
            animation_time={1000}
            enter_class={styles.bgAppear}
            exit_class={styles.bgDisappear} />
    );
});

export default Picture;