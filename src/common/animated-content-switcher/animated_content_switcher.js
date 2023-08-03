import React, {useState} from 'react';
import {useEffect, useRef} from "react";
import {CSSTransition} from "react-transition-group";

const AnimatedContentSwitcher =
    React.memo(({
         elements,
         switch_timeout,
         animation_time,
         enter_class,
         exit_class,
         initial_element_number = 0
    }) => {

    const [element_number, set_element_number] = useState(initial_element_number);
    const element_number_ref = useRef(element_number);
    element_number_ref.current = element_number;

    useEffect(() => {
        const interval_ID = setInterval(
            () => set_element_number((element_number_ref.current + 1) % elements.length),
            switch_timeout);
            return () => clearInterval(interval_ID);
        }, []);

    return (
        <>
            {elements.map((element, index) =>
                <CSSTransition
                    key={index}
                    in={index = element_number}
                    timeout={animation_time - 50}
                    classNames={{
                        enterActive: enter_class,
                        exitActive: exit_class}}
                    mountOnEnter
                    unmountOnExit>
                    {state => element}
                </CSSTransition>)}
        </>
    );
});

export default AnimatedContentSwitcher;