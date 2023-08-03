import React, {useContext, useRef, useState} from 'react';
import styles from "./header.module.css";
import {home_texts} from "../../../../texts/home_texts";
import {LangContext} from "../../../../context";
import {useEffect} from "react";
import {CSSTransition} from "react-transition-group";

const Header = React.memo(() => {

    const {lang} = useContext(LangContext);
    const [text_number, set_text_number] = useState(0);
    const text_number_ref = useRef(0);
    text_number_ref.current = text_number;
    const texts = ["subHeader0", "subHeader1", "subHeader2"];

    useEffect(() => {
        const interval_ID = setInterval(() => {
            set_text_number((text_number_ref.current + 1) % texts.length);
        }, 2000);
        return () => {
            clearInterval(interval_ID);
        };
    }, []);

    return (
        <div className={styles.headerContainer}>
            <h1>{home_texts["h1"][lang]}</h1>
            {texts.map((text, index) =>
                <CSSTransition
                    key={index}
                    in={index === text_number}
                    timeout={950}
                    classNames={{
                        enterActive: styles.textSlideIn,
                        exitActive: styles.textSlideOut
                    }}
                    mountOnEnter
                    unmountOnExit>
                    {state => <p>{home_texts[text][lang]}</p>}
                </CSSTransition>)}
        </div>
    );
});

export default Header;