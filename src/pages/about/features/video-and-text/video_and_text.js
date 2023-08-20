import React, {useContext} from 'react';
import styles from "./video_and_text.module.scss";
import video from "../../../../static/img/video.mp4";
import {AppContext} from "../../../../context";
import {about_texts} from "../../../../texts/about_texts";

const VideoAndText = () => {

    const {lang} = useContext(AppContext);
    const landscape_orientation =
        window.screen.orientation.type === "landscape-primary"
        || window.screen.orientation.type === "landscape-secondary";

    return (
        <div className={styles.videoAndTextContainer}>
            <div className={styles.textContainer}>
                <h1>{about_texts["h1_near_video"][lang]}</h1>
                <p>{about_texts["text_near_video"][lang]}</p>
            </div>
            <div className={styles.videoContainer}>
                <video height="100%" controls={false} autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default VideoAndText;