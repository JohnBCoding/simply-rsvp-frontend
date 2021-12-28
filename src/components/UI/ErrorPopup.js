import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./ErrorPopup.css";

const ErrorPopup = (props) => {
    const transitionErrRef = useRef(null);
    return (
        <CSSTransition
            in={props.display}
            timeout={300}
            unmountOnExit
            nodeRef={transitionErrRef}
            classNames="error"
        >
            <div ref={transitionErrRef} className={props.classes}>
                <p>{props.error}</p>
            </div>
        </CSSTransition>
    );
};

export default ErrorPopup;
