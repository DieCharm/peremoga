import React from 'react';
import styles from "./picture.module.scss";
import AnimatedContentSwitcher from "../../../../common/animated-content-switcher/animated_content_switcher";

const Picture = React.memo(() => {

    const bg_styles = [styles.bg0, styles.bg1, styles.bg2];
    const elements = bg_styles.map(bg_style => <div className={bg_style} />);

    return (
        <div>
            <AnimatedContentSwitcher
                elements={elements}
                switch_timeout={7000}
                animation_time={2000}
                enter_class={styles.bgAppear}
                exit_class={styles.bgDisappear} />
        </div>
    );
});

export default Picture;