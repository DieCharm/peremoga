import React from 'react';
import styles from "./video.module.scss";

const Video = ({video_path}) => {
    return (
        <video className={styles.videoContainer}
               controls={true} autoPlay loop muted>
            <source src={video_path} type="video/mp4" />
        </video>
    );
};

export default Video;