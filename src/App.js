import styles from './App.module.css';
import {useState} from "react";
import {LangContext} from "./context";
import LangSwitcher from "./components/lang-switcher/lang_switcher";
import {menu_items} from "./texts/menu_items";
import MenuItem from "./components/menu-item/menu_item";

function App() {

    const [lang, set_lang] = useState(0);

  return (
      <LangContext.Provider value={{lang, set_lang}}>
          <div className={styles.main}>
            <div className={styles.mainContainer}>
                <div className={styles.topBar}>
                    <div className={styles.halfTopBar}>
                        <div className={styles.logoContainer} />
                    </div>
                    <div className={styles.halfTopBar}>
                        <div className={styles.menu}>
                            <div className={styles.menuItemContainer}>
                                <MenuItem text={menu_items["about"][lang]} />
                            </div>
                            <div className={styles.menuItemContainer}>
                                <MenuItem text={menu_items["contacts"][lang]} />
                            </div>
                        </div>
                        <div className={styles.langSwitcherContainer}>
                            <LangSwitcher />
                        </div>
                    </div>
                </div>
            </div>
              <div id="bg1" style={{top: "-30vw", left: "15vw"}} className={styles.background} />
              <div id="bg2" style={{top: "10vw", left: "75vw"}} className={styles.background} />
          </div>
      </LangContext.Provider>
  );
}

export default App;