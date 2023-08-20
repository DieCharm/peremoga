import React, {useContext, useEffect, useRef, useState} from 'react';
import {AppContext, languages} from "../../../../context";
import styles from "./lang_switcher.module.scss";
import {CSSTransition} from "react-transition-group";

const LangSwitcher = () => {

    const {lang, set_lang} = useContext(AppContext);
    const [highlighted_lang, set_highlighted_lang] = useState(lang);
    const [dropdown_active, set_dropdown_active] = useState(false);
    const [show_dropdown_text, set_show_dropdown_text] = useState(false);
    const dropdown_ref = useRef();
    const switcher_ref = useRef();

    useEffect(() => {
        if (dropdown_active) {
            dropdown_ref.current.focus();
        }
        else {
            set_highlighted_lang(lang);
        }
        if (dropdown_active) {
            document.addEventListener("mousedown", click_outside);
            return () => document.removeEventListener("mousedown", click_outside);
        }
    }, [dropdown_active]);

    function handle_key_down(event) {
        if (event.code === "ArrowRight" || event.code === "ArrowDown") {
            set_highlighted_lang(prevState => (prevState + 1) % languages.length);
        }
        else if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
            set_highlighted_lang(prevState => prevState - 1 >= 0 ? prevState - 1 : languages.length - 1);
        }
        else if (event.code === "Enter") {
            choose_lang();
        }
        else if (event.code === "Escape") {
            set_dropdown_active(false);
        }
    }

    function click_outside(event) {
        if (dropdown_ref.current && switcher_ref.current
            && !dropdown_ref.current.contains(event.target)
            && !switcher_ref.current.contains(event.target)) {
            set_dropdown_active(false);
        }
    }

    function choose_lang(lang = highlighted_lang) {
        set_lang(lang);
        localStorage.setItem("lang", lang.toString());
        setTimeout(() => {
            set_dropdown_active(false);
        }, 50);
    }

    return (
        <>
            <div
                ref={switcher_ref}
                className={styles.langSwitcherContainer}
                onClick={() => set_dropdown_active(!dropdown_active)}>
                <span className={styles.langName}>{languages[lang]}</span>
                <CSSTransition
                    in={dropdown_active}
                    timeout={200}
                    classNames={{
                        enterActive: styles.arrowTurnsUp,
                        enterDone: styles.arrowUp,
                        exitActive: styles.arrowTurnsDown
                    }}>
                    <div className={styles.arrow} />
                </CSSTransition>
            </div>
            <CSSTransition
                in={dropdown_active}
                timeout={200}
                classNames={{
                    enterActive: styles.optionsEntering,
                    exitActive: styles.optionsExiting
                }}
                onEntering={() => setTimeout(() => set_show_dropdown_text(true), 100)}
                onExiting={() => setTimeout(() => set_show_dropdown_text(false), 100)}
                mountOnEnter
                unmountOnExit>
                <div
                    ref={dropdown_ref}
                    className={styles.optionsContainer}
                    onKeyDown={handle_key_down}
                    tabIndex={-1}>
                    {show_dropdown_text && languages.map((language, index) =>
                        <div key={index}
                             className={[
                                 styles.optionContainer,
                                 (index === highlighted_lang ? styles.highlighted : "")].join(" ")}
                             onMouseEnter={() =>
                                 set_highlighted_lang(index)}
                             onClick={() => choose_lang(index)}>
                            <span className={styles.langName}>{language}</span>
                            {index === lang &&
                                <div className={styles.checkMark}></div>}
                        </div>)}
                </div>
            </CSSTransition>
        </>
    );
};

export default LangSwitcher;