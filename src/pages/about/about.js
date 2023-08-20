import React, {useContext} from 'react';
import styles from "./about.module.scss";
import image_carousel_styles from "./features/image-carousel/image_carousel.module.scss";
import ImageCarousel from "./features/image-carousel/image_carousel";
import PageOfSeveralSlides from "../../common/page-of-several-slides/page_of_several_slides";
import {AppContext} from "../../context";
import ContentAndText from "./features/content-and-text/content_and_text";
import content_and_text_styles from "./features/content-and-text/content_and_text.module.scss";
import Video from "./features/video/video";
import video_path from "../../static/img/video.mp4";
import {about_texts} from "../../texts/about_texts";

const AboutPage = () => {

    const {lang} = useContext(AppContext);

    const video_and_text = <ContentAndText
        content={<Video video_path={video_path} />}
        header={about_texts["h1_near_video"][lang]}
        text={about_texts["text_near_video"][lang]} inverse={true} />;

    const slides = [<ImageCarousel />, video_and_text];
    const enter_classes = [image_carousel_styles.entering, content_and_text_styles.entering];
    const exit_classes = [image_carousel_styles.exiting, content_and_text_styles.exiting];

    return (
        <div className={styles.main}>
            <PageOfSeveralSlides
                slides={slides}
                enter_classes={enter_classes}
                exit_classes={exit_classes} />
        </div>
    );
};

export default AboutPage;