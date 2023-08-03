import React, {useContext} from 'react';
import {AppContext} from "../../context";
import {CSSTransition} from "react-transition-group";
import {useRef, useState} from "react";
import {useEffect} from "react";
import styles from "./page_of_several_slides.module.css";

const PageOfSeveralSlides = ({slides, enter_classes, exit_classes}) => {

    const {redirect_to} = useContext(AppContext);
    const [slide, set_slide] = useState(0);
    const [animating,set_animating] = useState(false);
    const [show_slide, set_show_slide] = useState(true);
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
        if (!animating) {
            if (event.changedTouches[0]?.screenY < prev_screen_Y) {
                change_slide(true);
            }
            else if (event.changedTouches[0]?.screenY > prev_screen_Y) {
                change_slide(false);
            }
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
        if (increment && slide < slides.length - 1) {
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
            className={styles.mainContainer}
            ref={main_ref}
            tabIndex={-1}
            onWheel={handle_wheel}
            onKeyDown={handle_key_down}
            onTouchStart={e => set_prev_screen_Y(e.touches[0].screenY)}
            onTouchEnd={handle_touch_end}>
            {slides.map((slide, index) =>
                <CSSTransition
                    in={redirect_to === null && slide === 0 && show_slide}
                    timeout={1000}
                    classNames={{
                        enterActive: enter_classes[index],
                        exitActive: exit_classes[index]}}
                    onEnter={() => set_animating(true)}
                    onExit={() => set_animating(true)}
                    onEntered={() => set_animating(false)}
                    onExited={() => {
                        set_animating(false);
                        set_show_slide(true);
                    }}
                    mountOnEnter
                    unmountOnExit>
                    {slide}
                </CSSTransition>)}
        </div>
    );
};

export default PageOfSeveralSlides;