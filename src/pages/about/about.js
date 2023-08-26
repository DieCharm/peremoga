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
import Image from "./features/image/image";
import image1_path from "../../static/img/about_image1.jpeg";
import image2_path from "../../static/img/about_image2.jpeg";

const AboutPage = () => {

    const {lang} = useContext(AppContext);

    const image_and_text1 = <ContentAndText
        content={<Image image_path={image1_path} />}
        header={about_texts["h1_near_video"][lang]}
        text={about_texts["text_near_video"][lang]} />

    const image_and_text2 = <ContentAndText
        content={<Image image_path={image2_path} />}
        header={about_texts["h1_near_video"][lang]}
        text={about_texts["text_near_video"][lang]}
        inverse={true} />

    const video_and_text = <ContentAndText
        content={<Video video_path={video_path} />}
        header={about_texts["h1_near_video"][lang]}
        text={about_texts["text_near_video"][lang]} />;

    const slides = [image_and_text1, image_and_text2, video_and_text, <ImageCarousel />];
    const enter_classes = [content_and_text_styles.entering, content_and_text_styles.entering, content_and_text_styles.entering, image_carousel_styles.entering];
    const exit_classes = [content_and_text_styles.exiting, content_and_text_styles.exiting, content_and_text_styles.exiting, image_carousel_styles.exiting];

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