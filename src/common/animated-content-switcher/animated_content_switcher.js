import React, {useState} from 'react';
import {useEffect, useRef} from "react";
import {CSSTransition} from "react-transition-group";
import variables from "../../styles/_variables.scss";

const AnimatedContentSwitcher =
    React.memo(({
                    elements,
                    switch_timeout,
                    enter_class,
                    exit_class,
                    animation_time = Number(variables.animationDuration) - 50,
                    handle_element_change = null,
                    initial_element_number = 0
    }) => {

        const [element_number, set_element_number] = useState(initial_element_number);
        const element_number_ref = useRef(element_number);
        element_number_ref.current = element_number;

        useEffect(() => {
            set_element_number(initial_element_number);
            const interval_ID = setInterval(
                () => {
                    const new_element_number = (element_number_ref.current + 1) % elements.length;
                    set_element_number(new_element_number);
                    if (handle_element_change) {
                        handle_element_change(new_element_number);
                    }
                },
                switch_timeout);
                return () => clearInterval(interval_ID);
            }, [initial_element_number]);

        return (
            <>
                {elements.map((element, index) =>
                    <CSSTransition
                        key={index}
                        in={index === element_number}
                        timeout={animation_time}
                        classNames={{
                            enterActive: enter_class,
                            exitActive: exit_class}}
                        mountOnEnter
                        unmountOnExit>
                        {element}
                    </CSSTransition>)}
            </>
        );
});

export default AnimatedContentSwitcher;