import React, {useEffect, useRef, useState} from 'react';
import styles from "./home.module.css";
import {CSSTransition} from "react-transition-group";
import Picture from "./features/picture/picture";

const HomePage = () => {

    const SLIDES_AMOUNT = 2;
    const [slide, set_slide] = useState(0);
    const [show_slide, set_show_slide] = useState(true);
    const [animating,set_animating] = useState(false);
    const [prev_screen_Y, set_prev_screen_Y] = useState(0);
    const main_ref = useRef();

    useEffect(() => main_ref.current.focus(), []);

    const handle_key_down = (event) => {
        if (!animating) {
            if (event.code === "ArrowDown") {
                change_slide(true);
            }
            else if (event.code === "ArrowUp") {
                change_slide(false);
            }
        }
    }

    const handle_touch_end = (event) => {
        if (event.changedTouches[0]?.screenY < prev_screen_Y) {
            change_slide(true);
        }
        else if (event.changedTouches[0]?.screenY > prev_screen_Y) {
            change_slide(false);
        }
    }

    const handle_wheel = (e) => {
        if (!animating) {
            if (e.deltaY > 0) {
                change_slide(true);
            }
            else if (e.deltaY < 0) {
                change_slide(false);
            }
        }
    }

    const change_slide = (increment) => {
        if (increment && slide < SLIDES_AMOUNT - 1) {
            set_slide(slide + 1);
            set_show_slide(false);
        }
        else if (!increment && slide > 0) {
            set_slide(slide - 1);
            set_show_slide(false);
        }
    }

    return (
        <div
            ref={main_ref}
            tabIndex={-1}
            className={styles.pageContainer}
            onWheel={handle_wheel}
            onKeyDown={handle_key_down}
            onTouchStart={e => set_prev_screen_Y(e.touches[0].screenY)}
            onTouchEnd={handle_touch_end} >
            <CSSTransition
                in={slide === 0 && show_slide}
                timeout={1000}
                classNames={{
                    enterActive: styles.pictureAppears,
                    exitActive: styles.pictureDisappears}}
                onEnter={() => set_animating(true)}
                onExit={() => set_animating(true)}
                onEntered={() => set_animating(false)}
                onExited={() => {
                    set_animating(false);
                    set_show_slide(true);
                }}
                mountOnEnter
                unmountOnExit>
                <Picture />
            </CSSTransition>
            <CSSTransition
                in={slide === 1 && show_slide}
                timeout={1000}
                classNames={{
                    enterActive: styles.pictureAppears,
                    exitActive: styles.pictureDisappears
            }}
                onEnter={() => set_animating(true)}
                onExit={() => set_animating(true)}
                onEntered={() => set_animating(false)}
                onExited={() => {
                    set_animating(false);
                    set_show_slide(true);
                }}
                mountOnEnter
                unmountOnExit>
                <div className={styles.boxesContainer} />
            </CSSTransition>
        </div>
    );
};

export default HomePage;