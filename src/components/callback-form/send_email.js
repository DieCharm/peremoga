import emailjs from '@emailjs/browser';

const SERVICE_ID = "peremoga_service";
const TEMPLATE_ID = "peremoga_callback";
const PUBLIC_KEY = "vUgFwBKB_fyiUqP5A";

export const send_email = async (email) => {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, email, PUBLIC_KEY);
}