import React, {useEffect, useRef, useState} from "react";
import "./Scroll.scss";
import {VscTriangleUp} from "react-icons/vsc";
import {VscTriangleDown} from "react-icons/vsc";
import classNames from "classnames";

const Scroll = () => {
    const UP_THRESHOLD = 500;
    const FORGET_THRESHOLD = 2000;
    const BIG_HEADER = 50;

    const scrollWas = useRef(false);
    const lastPoint = useRef(0);

    const [arrowTopIsHidden, setArrowTopIsHidden] = useState(true);
    const [arrowBottomIsHidden, setArrowBottomIsHidden] = useState(true);

    const goTop = () => {
        lastPoint.current = window.scrollY;
        setArrowBottomIsHidden(false);
        scrollWas.current = true;
        window.scrollTo(window.scrollX, 0); //scroll event will arise automatically after this
    };

    const goBack = () => {
        window.scrollTo(window.scrollX, lastPoint.current);
    };

    const CalculateScroll = () => {
        setArrowTopIsHidden(window.scrollY < UP_THRESHOLD);
        setArrowBottomIsHidden(!(scrollWas.current && window.scrollY < BIG_HEADER));
        if (scrollWas && window.scrollY > FORGET_THRESHOLD) {
            scrollWas.current = false;
        }
    };

    useEffect(() => {
        const ScrollHandle = () => {
            let scrollWidth = Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.body.clientWidth,
                document.documentElement.clientWidth
            );
            if (scrollWidth > 768) {
                CalculateScroll();
            }
        };
        window.addEventListener("scroll", ScrollHandle);
        return () => {
            window.removeEventListener("scroll", ScrollHandle);
        };
    }, []);

    const arrowTopClass = classNames({
        "scroll-button": true,
        hidden: arrowTopIsHidden,
    });
    const arrowBottomClass = classNames({
        "scroll-button": true,
        hidden: arrowBottomIsHidden,
    });

    return (
        <div className="scroll">
            <div className={arrowTopClass} onClick={goTop}>
                <VscTriangleUp className="scroll-button__img"/>
            </div>
            <div className={arrowBottomClass} onClick={goBack}>
                <VscTriangleDown className="scroll-button__img scroll-button__img--down"/>
            </div>
        </div>
    );
};

export default Scroll;
