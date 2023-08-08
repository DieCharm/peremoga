import React, {useContext} from 'react';
import {info_boxes_texts} from "../../../../texts/info_boxes_texts";
import styles from "./info-boxes.module.css";
import InfoBox from "./info-box/info_box";
import {AppContext} from "../../../../context";

const InfoBoxes = React.memo(() => {

    const {lang} = useContext(AppContext);

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.boxesContainer}>
                {Object.keys(info_boxes_texts).map(key =>
                    <InfoBox
                        key={key}
                        name={info_boxes_texts[key]["name"][lang]}
                        image={info_boxes_texts[key]["picture"]} />)}
            </div>
        </div>
    );
});

export default InfoBoxes;