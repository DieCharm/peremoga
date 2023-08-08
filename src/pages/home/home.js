import React from 'react';
import PageOfSeveralSlides from "../../common/page-of-several-slides/page_of_several_slides";
import Header from "./features/header/header";
import InfoBoxes from "./features/info-boxes/info_boxes";
import header_styles from "./features/header/header.module.css";
import info_boxes_styles from "./features/info-boxes/info-boxes.module.css";

const HomePage = () => {

    const slides = [<Header/>, <InfoBoxes />];
    const enter_classes = [header_styles.entering, info_boxes_styles.entering];
    const exit_classes = [header_styles.exiting, info_boxes_styles.exiting];

    return (
        <PageOfSeveralSlides
            slides={slides}
            enter_classes={enter_classes}
            exit_classes={exit_classes} />
    );
};

export default HomePage;