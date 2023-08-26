import React, {useContext, useEffect, useState} from 'react';
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
    const [sending, set_sending] = useState(false);
    const [sending_success, set_sending_success] = useState(false);
    const [sending_error, set_sending_error] = useState(false);
    const [show_invalidity_message, set_show_invalidity_message] = useState(false);

    //separate states bc when input is "" form in total is invalid but this particular input should not be marked red
    const [form_data_invalidity, set_form_data_invalidity] = useState(true);
    const [form_data_invalidities, set_form_data_invalidities] = useState({
        name: false,
        phone_number: false,
        email_address: false,
        message: false
    });

    const allow_input_name = (name) => name.split("").every((char) =>(char === " " || char.toLowerCase() !== char.toUpperCase()));
    const allow_input_phone = (phone) => phone.split("").every(char => char >= '0' && char <= '9');

    const is_name_valid = () => form_data.name.length > 0;
    const is_phone_valid = () => form_data.phone_number.length >= 10 && form_data.phone_number.length <= 12;
    const is_email_valid = () => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form_data.email_address);

    const handle_phone_blur = () => set_form_data_invalidities({
        ...form_data_invalidities,
        phone_number: (form_data.phone_number.length > 0 && !is_phone_valid())});
    const handle_email_blur = () => set_form_data_invalidities({
        ...form_data_invalidities,
        email_address: (form_data.email_address.length > 0 && !is_email_valid())});

    useEffect(() => {
        set_show_invalidity_message(false);
        set_form_data_invalidity(!(is_name_valid()
            && ((is_phone_valid() && (form_data.email_address.length === 0 || is_email_valid()))
                || (is_email_valid() && (form_data.phone_number.length === 0 || is_phone_valid())))));
    }, [form_data]);

    const on_form_submit = () => {
        set_sending_error(false);
        set_sending_success(false);

        //should be valid name and either phone number or email
        if (!form_data_invalidity) {
            set_sending(true);
            set_form_data_invalidity(true);
            set_sending_error(false);
            set_sending_success(false);
            send_email(form_data).then(
                () => {
                    set_sending(false);
                    set_sending_success(true);
                },
                () => {
                    set_sending(false);
                    set_sending_error(true);
                }
            );
            set_form_data(initial_form_data);
        }
        else {
            set_show_invalidity_message(true);
        }
    }

    return (
        <div className={styles.formWrapper}>
            <h2>{contacts_texts["callback"][lang]}</h2>
            <form className={styles.callbackForm}>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder={contacts_texts["name"][lang]}
                    value={form_data.name}
                    maxLength={30}
                    onChange={(e) => {
                        if (allow_input_name(e.target.value)) {
                            set_form_data({...form_data, name: e.target.value});
                        }
                    }} />
                <input
                    className={form_data_invalidities.phone_number ? styles.invalidInput : styles.input}
                    type="tel"
                    name="phone_number"
                    placeholder={contacts_texts["phone"][lang]}
                    value={form_data.phone_number}
                    maxLength={12}
                    onBlur={handle_phone_blur}
                    onChange={e => {
                        if (allow_input_phone(e.target.value)) {
                            set_form_data({...form_data, phone_number: e.target.value});
                        }
                    }} />
                <input
                    className={form_data_invalidities.email_address ? styles.invalidInput : styles.input}
                    type="email"
                    name="email_address"
                    placeholder={contacts_texts["mail"][lang]}
                    value={form_data.email_address}
                    maxLength={30}
                    onBlur={handle_email_blur}
                    onChange={e => set_form_data({...form_data, email_address: e.target.value})}/>
                <textarea
                    className={styles.input}
                    name="message"
                    placeholder={contacts_texts["message"][lang]}
                    value={form_data.message}
                    onChange={e => set_form_data({...form_data, message: e.target.value})} />
            </form>
            <div className={styles.result}>
                <button
                    type="button"
                    className={form_data_invalidity ? styles.button : styles.buttonEnabled}
                    onClick={on_form_submit}>
                    {contacts_texts["send"][lang]}
                </button>
                <div>
                    {sending &&
                        <span>{contacts_texts["sending"][lang]}</span>}
                    {show_invalidity_message &&
                        <span className={styles.red}>{contacts_texts["form_data_invalidity"][lang]}</span>}
                    {sending_success &&
                        <span className={styles.green}>{contacts_texts["sending_success"][lang]}</span>}
                    {sending_error &&
                        <span className={styles.red}>{contacts_texts["sending_error"][lang]}</span>}
                </div>
            </div>
        </div>
    );
};

export default CallbackForm;