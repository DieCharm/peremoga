import React, {useEffect, useRef, useState} from 'react';
import styles from "./picture.module.css";

const Picture = () => {

    const PICTURES_AMOUNT = 4;
    const [background_number, set_background_number] = useState(0);
    const [animating, set_animating] = useState(false);
    const picture_ref = useRef();
    const background_number_ref = useRef(background_number);
    background_number_ref.current = background_number;
    const timeout_ID_ref = useRef(0);

    useEffect(() => {
        const interval_ID = setInterval(() => {
            set_animating(true);
            timeout_ID_ref.current = setTimeout(() => {
                if (background_number_ref.current + 1 < PICTURES_AMOUNT) {
                    set_background_number(background_number_ref.current + 1);
                }
                else {
                    set_background_number(0);
                }
            }, 100);
        }, 3000);
        return () => {
            console.log("unmount");
            clearInterval(interval_ID);
            console.log("id ref: " + timeout_ID_ref.current);
            clearTimeout(timeout_ID_ref.current);
        };
    }, []);

    return (
        <div ref={picture_ref}
            className={[
                styles.picture,
                background_number === 0 ? styles.bg0 : null,
                background_number === 1 ? styles.bg1 : null,
                background_number === 2 ? styles.bg2 : null,
                background_number === 3 ? styles.bg3 : null
            ].join(" ")}
            onAnimationEnd={(e) => {
                console.log("animation end");
                set_animating(false);
            }} />
    );
};

export default Picture;