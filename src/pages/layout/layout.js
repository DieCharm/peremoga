import React, {useEffect} from 'react';
import MenuItem from "./features/menu-item/menu_item";
import {menu_items_texts} from "../../texts/layout_texts";
import LangSwitcher from "./features/lang-switcher/lang_switcher";
import styles from "./layout.module.css";
import {useState} from "react";
import {AppContext} from "../../context";
import {Outlet, useNavigate} from "react-router";
import Picture from "./features/picture/picture";
import Footer from "./features/footer/footer";

const LayoutPage = () => {

    const stored_lang = localStorage.getItem("lang");
    const [lang, set_lang] = useState(stored_lang !== null ? Number(stored_lang) : 0);
    const [redirect_to, set_redirect_to] = useState(null);
    const [logo_underline_active, set_logo_underline_active] = useState(false);
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

    return (
        <AppContext.Provider value={{lang, set_lang, redirect_to}}>
            <div className={styles.main}>
                <Picture/>
                <div
                    onClick={() => set_redirect_to("")}
                    onMouseEnter={() => set_logo_underline_active(true)}
                    onMouseLeave={() => set_logo_underline_active(false)}
                    className={styles.logo} >
                    <div className={styles.logoUnderlineContainer}>
                        <div className={[
                            styles.logoUnderlineInactive,
                            (logo_underline_active ? styles.logoUnderlineActive : "")].join(" ")}/>
                    </div>
                </div>
                <div className={styles.topBar}>
                    <div className={styles.menuContainer}>
                        <div className={styles.menu}>
                            <div className={styles.menuItemContainer}>
                                <MenuItem
                                    text={menu_items_texts["about"][lang]}
                                    callback={() => set_redirect_to("about")} />
                            </div>
                            <div className={styles.menuItemContainer}>
                                <MenuItem
                                    text={menu_items_texts["contacts"][lang]}
                                    callback={() => set_redirect_to("contacts")} />
                            </div>
                        </div>
                        <div className={styles.langSwitcherContainer}>
                            <LangSwitcher />
                        </div>
                    </div>
                </div>
                <Outlet />
                <Footer />
                <div className={[styles.background, styles.position1].join(" ")} />
                <div className={[styles.background, styles.position2].join(" ")} />
            </div>
        </AppContext.Provider>
    );
};

export default LayoutPage;