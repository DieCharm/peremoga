import React, {useContext, useState} from 'react';
import styles from "./callback_form.module.scss";
import {send_email} from "./send_email";
import {contacts_texts} from "../../../../texts/contacts_texts";
import {AppContext} from "../../../../context";

const CallbackForm = () => {

    const initial_form_data = {
        name: "",
        phone_number: "",
        email_address: "",
        message: ""
    };

    const {lang} = useContext(AppContext);
    const [form_data, set_form_data] = useState(initial_form_data);
    const [send_success, set_send_success] = useState(false);
    const [send_error, set_send_error] = useState(false);
    const [error_message, set_error_message] = useState("");
    const [disabled_button, set_disabled_button] = useState(true);

    const on_form_change = () => {
        if (form_data.name.length > 0
            && ((form_data.phone_number.length >= 10
                    && form_data.phone_number.length <= 12)
                || (form_data.email_address.length > 0
                    && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form_data.email_address))))
        {
            set_disabled_button(false);
        }
        else {
            set_disabled_button(true);
        }
    }

    const on_form_submit = (event) => {
        console.log("click");
        event.preventDefault();
        set_send_error(false);
        set_send_success(false);
        set_error_message("");
        //should be valid name and either phone number or email
        if (form_data.name.length === 0) {
            set_error_message("Введіть Ваше ім'я");
        }
        else if (form_data.phone_number.length > 0 && form_data.phone_number.length < 10) {
            set_error_message("Введено некоректний номер телефону");
        }
        else if (form_data.email_address.length > 0 && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form_data.email_address)) {
            set_error_message("Введено некоректну електронну адресу");
        }
        else if (form_data.phone_number.length === 0 && form_data.email_address.length === 0) {
            set_error_message("Перед відправкою введіть свою пошту або номер телефону");
        }
        else {
            set_error_message("");
            set_form_data(initial_form_data);
            set_disabled_button(true);
            set_send_error(false);
            set_send_success(false);
            send_email(form_data).then(
                () => set_send_success(true),
                () => set_send_error(true)
            );
        }
    }

    return (
        <div className={styles.formWrapper}>
            <h2>{contacts_texts["callback"][lang]}</h2>
            <form className={styles.callbackForm} onChange={on_form_change}>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder={contacts_texts["name"][lang]}
                    value={form_data.name}
                    onChange={e => {
                        if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                            set_form_data({...form_data, name: e.target.value});
                        }
                    }} />
                <input
                    className={styles.input}
                    type="tel"
                    name="phone_number"
                    placeholder={contacts_texts["phone"][lang]}
                    value={form_data.phone_number}
                    onChange={e => {
                        if (e.target.value.length <= 12) {
                            set_form_data({...form_data, phone_number: e.target.value});
                        }
                    }} />
                <input
                    className={styles.input}
                    type="email"
                    name="email_address"
                    placeholder={contacts_texts["mail"][lang]}
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    value={form_data.email_address}
                    onChange={e => set_form_data({...form_data, email_address: e.target.value})}/>
                <textarea
                    className={styles.input}
                    name="message"
                    placeholder={contacts_texts["message"][lang]}
                    value={form_data.message}
                    onChange={e => set_form_data({...form_data, message: e.target.value})} />
                <div className={styles.result}>
                    <button
                        type="button"
                        className={styles.button}
                        disabled={disabled_button}
                        onClick={on_form_submit}>
                        {contacts_texts["send"][lang]}
                    </button>
                    <div>
                        {(!send_error && !send_success) &&
                            <span className={styles.red}>{error_message}</span>}
                        {send_success &&
                            <span className={styles.green}>Ваше повідомлення надіслано! Ми з Вами зв'жемось</span>}
                        {send_error &&
                            <span className={styles.red}>Помилка в надсиланні. Зв'яжіться із нами напряму, або спробуйте пізніше</span>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CallbackForm;