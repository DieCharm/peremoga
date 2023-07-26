import React, {useState} from 'react';
import styles from "./menu_item.module.css";
import {CSSTransition} from "react-transition-group";
import {inject_style} from "../../helpers/inject_style";

const MenuItem = ({text, callback}) => {

    const animation_timeout_ms = 1000;
    const [underline_active, set_underline_active] = useState(false);
    const [animation_start, set_animation_start] = useState(0);
    const css = {backgroundColor: "red"};

    const add_disappear_animation_styles = (percentage) => {
        const keyframes = `@keyframes underlineDisappear { 
            0% { width: ${percentage}%; } 
            100% { width: 0; }
        }`;
        const animation = `.underlineDisappears { animation: underlineDisappear ${(percentage / 100) * animation_timeout_ms}ms }`;
        try {
            inject_style(keyframes);
            inject_style(animation);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handle_mouse_enter = () => {
        set_animation_start(Date.now());
        set_underline_active(true);
    }

    const handle_mouse_leave = () => {
        const animation_end = Date.now();
        const animation_duration = animation_end - animation_start;
        if (animation_duration >= animation_timeout_ms) {
            //add_disappear_animation_styles(100);
        }
        else {
            const animation_percentage = (animation_duration / animation_timeout_ms) * 100;
            //add_disappear_animation_styles(animation_percentage);
        }
        set_underline_active(false);
    }

    return (
        <div
            className={styles.container}
            onClick={callback}
            onMouseEnter={handle_mouse_enter}
            onMouseLeave={handle_mouse_leave}>
            <span className={styles.menuItemText}>{text}</span>
            <div className={styles.menuItemUnderlineContainer}>
                <CSSTransition
                    in={underline_active}
                    timeout={animation_timeout_ms}
                    classNames={{
                        enterActive: styles.underlineAppears}}
                    mountOnEnter
                    unmountOnExit >
                    {state => <div
                        className={styles.menuItemUnderline}/>}
                </CSSTransition>
            </div>
        </div>
    );
};

MenuItem.propTypes = {

};

export default MenuItem;