import React from 'react';
import styles from "./contacts.module.scss";
import PageOfSeveralSlides from "../../common/page-of-several-slides/page_of_several_slides";
import CallbackForm from "./features/callback-form/callback_form";
import ContactsList from "./features/contacts-list/contacts_list";
import GoogleMap from "./features/map/google_map";

const ContactsPage = () => {

    return (
        <div className={styles.main}>
            <PageOfSeveralSlides
                slides={[
                    <div className={styles.wrapper}>
                        <div className={styles.contactsListWrapper}>
                            <ContactsList />
                        </div>
                        <div className={styles.mapWrapper}>
                            <GoogleMap />
                        </div>
                        <div className={styles.callbackFormWrapper}>
                            <CallbackForm />
                        </div>
                    </div>]}
                enter_classes={[styles.entering]}
                exit_classes={[styles.exiting]}/>
        </div>
    );
};

export default ContactsPage;