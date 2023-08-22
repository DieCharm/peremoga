import React, {useState} from 'react';
import styles from "./image_carousel.module.scss";
import AnimatedContentSwitcher from "../../../../common/animated-content-switcher/animated_content_switcher";

const ImageCarousel = () => {

    const image_styles = [styles.image1, styles.image2, styles.image3];
    const images = image_styles.map(image_style => <div className={image_style} />);

    const [image_number, set_image_number] = useState(0);
    const [exit_class, set_exit_class] = useState(styles.imageDisappearanceToLeft);
    const [enter_class, set_enter_class] = useState(styles.imageAppearanceFromRight);
    const [prev_screen_X, set_prev_screen_X] = useState(0);
    const [prev_screen_Y, set_prev_screen_Y] = useState(0);

    const handle_touch_start = (event) => {
        set_prev_screen_X(event.touches[0].screenX);
        set_prev_screen_Y(event.touches[0].screenY);
    }

    const handle_touch_end = (event) => {
        if (Math.abs(prev_screen_Y - event.changedTouches[0]?.screenY) < Math.abs(prev_screen_X - event.changedTouches[0]?.screenX)) {
            event.stopPropagation();
            if (event.changedTouches[0]?.screenX < prev_screen_X) {
                handle_image_number_increment()
            }
            else if (event.changedTouches[0]?.screenX > prev_screen_X) {
                handle_image_number_decrement();
            }
        }
    }

    const handle_image_number_decrement = () => {
        handle_image_number_change(
            image_number >= 1
                ? image_number - 1
                : image_styles.length - 1);
    }

    const handle_image_number_increment = () => {
        handle_image_number_change(
            (image_number + 1) % image_styles.length);
    }

    const handle_image_number_change = (new_image_number) => {

        if (new_image_number < image_number) {
            set_exit_class(styles.imageDisappearanceToRight);
            set_enter_class(styles.imageAppearanceFromLeft);

            const timeout_ID = setTimeout(() => {
                set_exit_class(styles.imageDisappearanceToLeft);
                set_enter_class(styles.imageAppearanceFromRight);
                clearTimeout(timeout_ID);
            }, 500);
        }

        set_image_number(new_image_number);
    }

    return (
        <div
            className={styles.carouselContainer}
            onTouchStart={handle_touch_start}
            onTouchEnd={handle_touch_end}>

            <AnimatedContentSwitcher
                elements={images}
                switch_timeout={5000}
                enter_class={enter_class}
                exit_class={exit_class}
                animation_time={500}
                handle_element_change={(value) => set_image_number(value)}
                initial_element_number={image_number} />

            <div
                className={styles.arrowWrapperLeft}
                onClick={handle_image_number_decrement}>
                <div className={styles.arrowLeft} />
            </div>
            <div
                className={styles.arrowWrapperRight}
                onClick={handle_image_number_increment}>
                <div className={styles.arrowRight} />
            </div>

            <div className={styles.dotsContainer}>
                {[...Array(image_styles.length).keys()].map(index =>
                    <div
                        key={index}
                        className={styles.dotWrapper}>
                        <div
                            className={index === image_number
                                ? styles.dotActive
                                : styles.dot}
                            onClick={() => handle_image_number_change(index)} />
                    </div>)}
            </div>
        </div>
    );
};

export default ImageCarousel;