import React, {useContext} from 'react';
import styles from "./contacts_list.module.scss";
import {AppContext} from "../../../../context";
import {contacts_texts} from "../../../../texts/contacts_texts";
import UnderlinableLink from "../../../../common/underlinable-link/underlinable_link";

const ContactsList = () => {

    const {lang} = useContext(AppContext);

    return (
        <div className={styles.contactsWrapper}>
            <h2>{contacts_texts["contacts"][lang]}</h2>

            <div>
                <div className={styles.contactWrapper}>
                    <p>{contacts_texts["phone"][lang]}:</p>
                    <a href="tel:+380680757509">
                        <UnderlinableLink element="+380(68)-075-75-09" />
                    </a>
                </div>

                <div className={styles.contactWrapper}>
                    <p>{contacts_texts["mail"][lang]}:</p>
                    <a href="mailto:pobeda.darnica@gmail.com">
                        <UnderlinableLink element="pobeda.darnica@gmail.com" />
                    </a>
                </div>

                <div className={styles.contactWrapper}>
                    <p>instagram:</p>
                    <a href="https://www.instagram.com/peremoga.hall/">
                        <UnderlinableLink element="@pobeda.darnica" />
                    </a>
                </div>

                <div className={styles.contactWrapper}>
                    <p>facebook:</p>
                    <a href="https://www.facebook.com/pobeda.darnica">
                        <UnderlinableLink element="Локація Перемога" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactsList;