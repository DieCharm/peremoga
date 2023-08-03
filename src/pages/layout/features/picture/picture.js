import React, {useEffect, useRef, useState} from 'react';
import styles from "./picture.module.css";
import {CSSTransition} from "react-transition-group";

const Picture = React.memo(() => {

    const [background_number, set_background_number] = useState(0);
    const background_number_ref = useRef(background_number);
    background_number_ref.current = background_number;
    const bgStyles = [styles.bg0, styles.bg1, styles.bg2, styles.bg3];

    useEffect(() => {
        const interval_ID = setInterval(() => {
            set_background_number((background_number_ref.current + 1) % bgStyles.length);
        }, 5000);
        return () => {
            clearInterval(interval_ID);
        };
    }, []);

    return (
        <>
            {bgStyles.map((bg_style, index) =>
                <CSSTransition
                    key={index}
                    in={index === background_number}
                    timeout={950}
                    classNames={{
                        enterActive: styles.bgAppear,
                        exitActive: styles.bgDisappear
                    }}
                    mountOnEnter
                    unmountOnExit>
                    {state => <div className={[
                        styles.picture,
                        bg_style
                    ].join(" ")}></div>}
                </CSSTransition>)}
        </>
    );
});

export default Picture;