import React from 'react';
import styles from "./google_map.module.scss";

const GoogleMap = () => {
    return (
        <iframe
            className={styles.mapWrapper}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d433.089021901207!2d30.607682559600143!3d50.460040919341765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf874ee76993%3A0xefe8dbb989901893!2z0JrQvtC90YbQtdGA0YLQvdC-LdGC0LDQvdGG0LXQstCw0LvRjNC90YvQuSDQt9Cw0LsgwqvQoNCe0JLQldCh0J3QmNCawrs!5e0!3m2!1suk!2sua!4v1692553974234!5m2!1suk!2sua"
            width="100%" height="100%" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" />
    );
};

export default GoogleMap;