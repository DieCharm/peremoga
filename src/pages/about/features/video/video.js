import React, {useRef} from 'react';
import styles from "./video.module.scss";

const Video = ({video_path}) => {

    const container_ref = useRef();

    return (
        <div ref={container_ref} className={styles.videoContainer}>
            <video
                height={(container_ref.current?.width / container_ref.current?.height) > (848 / 464) ? "auto" : "100%"}
                width={(container_ref.current?.width / container_ref.current?.height) > (848 / 464) ? "100%" : "auto"}
                controls={true} autoPlay loop muted>
                <source src={video_path} type="video/mp4" />
            </video>
        </div>
    );
};

export default Video;