import React, {useEffect} from 'react';
import UnderlinableLink from "../../common/underlinable-link/underlinable_link";
import {menu_items_texts} from "../../texts/layout_texts";
import LangSwitcher from "./features/lang-switcher/lang_switcher";
import styles from "./layout.module.scss";
import {useState} from "react";
import {AppContext} from "../../context";
import {Outlet, useNavigate} from "react-router";
import Picture from "./features/picture/picture";
import Footer from "./features/footer/footer";

const LayoutPage = () => {

    const stored_lang = localStorage.getItem("lang");
    const [lang, set_lang] = useState(stored_lang !== null ? Number(stored_lang) : 0);
    const [redirect_to, set_redirect_to] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout_ID = setTimeout(() => {
            if (redirect_to instanceof String || typeof redirect_to === 'string') {
                const to = redirect_to;
                set_redirect_to(null);
                navigate(to);
            }
            }, 1000);
        return () => clearTimeout(timeout_ID);
    }, [redirect_to]);

    const handle_touch_end = (event) => {
        window.scrollTo(0, 1); // wait for https
    }

    return (
        <AppContext.Provider value={{lang, set_lang, redirect_to}}>
            <div
                onTouchEnd={handle_touch_end}
                className={styles.main}>

                <div className={styles.topBar}>
                    <div className={styles.menuContainer}>
                        <div className={styles.menu}>
                            <div className={styles.menuItemContainer}>
                                <UnderlinableLink
                                    element={<span className={styles.menuItemText}>{menu_items_texts["main"][lang]}</span>}
                                    callback={() => set_redirect_to("")} />
                            </div>
                            <div className={styles.menuItemContainer}>
                                <UnderlinableLink
                                    element={<span className={styles.menuItemText}>{menu_items_texts["about"][lang]}</span>}
                                    callback={() => set_redirect_to("about")} />
                            </div>
                            <div className={styles.menuItemContainer}>
                                <UnderlinableLink
                                    element={<span className={styles.menuItemText}>{menu_items_texts["contacts"][lang]}</span>}
                                    callback={() => set_redirect_to("contacts")} />
                            </div>
                        </div>
                        <div className={styles.langSwitcherContainer}>
                            <LangSwitcher />
                        </div>
                    </div>
                </div>

                <Picture />
                <Outlet />
                <Footer />
                <div className={[styles.background, styles.position1].join(" ")} />
                <div className={[styles.background, styles.position2].join(" ")} />

            </div>
        </AppContext.Provider>
    );
};

export default LayoutPage;
