import React, {useEffect} from 'react';
import MenuItem from "./features/menu-item/menu_item";
import {menu_items} from "../../texts/menu_items";
import LangSwitcher from "./features/lang-switcher/lang_switcher";
import styles from "./layout.module.css";
import {useState} from "react";
import {LangContext} from "../../context";
import {Outlet, useNavigate} from "react-router";

const LayoutPage = () => {

    const stored_lang = localStorage.getItem("lang");
    const [lang, set_lang] = useState(stored_lang !== null ? Number(stored_lang) : 0);
    const [redirect_to, set_redirect_to] = useState(null);
    const [logo_underline_active, set_logo_underline_active] = useState(false);
    const navigate = useNavigate();

    const before_redirect = (path) => {
        setTimeout(() => set_redirect_to(path), 1000);
    }

    useEffect(() => {
        if (redirect_to instanceof String || typeof redirect_to === 'string') {
            const to = redirect_to;
            set_redirect_to(null);
            navigate(to);
        }
    }, [redirect_to]);

    return (
        <LangContext.Provider value={{lang, set_lang}}>
            <div className={styles.main}>
                <div
                    onClick={() => before_redirect("")}
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
                    <div className={styles.leftContainer} />
                    <div className={styles.menuContainer}>
                        <div className={styles.menu}>
                            <div className={styles.menuItemContainer}>
                                <MenuItem
                                    text={menu_items["about"][lang]}
                                    callback={() => before_redirect("about")} />
                            </div>
                            <div className={styles.menuItemContainer}>
                                <MenuItem
                                    text={menu_items["contacts"][lang]}
                                    callback={() => before_redirect("contacts")} />
                            </div>
                        </div>
                        <div className={styles.langSwitcherContainer}>
                            <LangSwitcher />
                        </div>
                    </div>
                </div>
                <Outlet />
                <div className={[styles.background, styles.position1].join(" ")} />
                <div className={[styles.background, styles.position2].join(" ")} />
            </div>
        </LangContext.Provider>
    );
};

export default LayoutPage;