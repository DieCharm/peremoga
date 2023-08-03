import React from 'react';
import styles from "./home.module.css";
import Header from "./features/header/header";
import PageOfSeveralSlides from "../../common/page-of-several-slides/page_of_several_slides";

const HomePage = () => {

    const slides = [<Header/>, <div className={styles.boxesContainer} />]
    const enter_classes = [styles.pictureAppears, styles.pictureAppears];
    const exit_classes = [styles.pictureDisappears, styles.pictureDisappears];

    return (
        <PageOfSeveralSlides
            slides={slides}
            enter_classes={enter_classes}
            exit_classes={exit_classes} />
    );
};

export default HomePage;