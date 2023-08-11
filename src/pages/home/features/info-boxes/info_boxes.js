import React, {useContext, useEffect, useRef} from 'react';
import {info_boxes_texts} from "../../../../texts/info_boxes_texts";
import styles from "./info-boxes.module.css";
import InfoBox from "./info_box";
import {AppContext} from "../../../../context";

const InfoBoxes = React.memo(() => {

    const {lang} = useContext(AppContext);
    const boxes_container_ref = useRef();

    useEffect(() => console.log(document.getElementById("box1")));

    const handle_touch_end = (event) => {
        console.log(boxes_container_ref.current.scrollTop);
        if (boxes_container_ref.current.scrollHeight > boxes_container_ref.current.clientHeight
            && boxes_container_ref.current.scrollTop !== 0) {
            event.stopPropagation();
        }
    }

    return (
        <div className={styles.mainWrapper}>
            <div
                ref={boxes_container_ref}
                className={styles.boxesContainer}
                onTouchEnd={handle_touch_end}>
                {Object.keys(info_boxes_texts).map((key, index) =>
                    <InfoBox
                        key={key}
                        index={index}
                        name={info_boxes_texts[key]["name"][lang]}
                        image={info_boxes_texts[key]["picture"]}
                        text={info_boxes_texts[key]["text"][lang]} />)}
            </div>
        </div>
    );
});

export default InfoBoxes;