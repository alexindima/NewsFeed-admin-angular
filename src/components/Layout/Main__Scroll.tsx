import React, {useEffect, useState} from "react";
import "./Main__Scroll.scss"
import { VscTriangleUp } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import classNames from "classnames";

export function Main__Scroll () {
    let [scrollWas, setScrollWas] = useState(false) //разобраться почему не сохраняется для калкулейт
    let [lastPoint, setLastPoint] = useState(0)
    let [arrowTopIsHidden, setArrowTopIsHidden] = useState(true)
    let [arrowBottomIsHidden, setArrowBottomIsHidden] = useState(true)

    const upThreshold = 500;
    const forgetThreshold = 2000;
    const bigHeader = 50;

    function goTop() {
        setScrollWas(scrollWas = true);
        console.log('gotop');
        setLastPoint(lastPoint = window.scrollY);
        setArrowBottomIsHidden( arrowBottomIsHidden = false);
        console.log(arrowBottomIsHidden);
        window.scrollTo(window.scrollX , 0);
        console.log(arrowBottomIsHidden);
        // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
    }

    function goBack () {
        window.scrollTo(window.scrollX, lastPoint);
    }

    function CalculateScroll() {
        console.log('calc');
        console.log(window.scrollY);
        console.log(scrollWas);
        setArrowTopIsHidden(arrowTopIsHidden = (window.scrollY < upThreshold));
        setArrowBottomIsHidden(arrowBottomIsHidden = !((scrollWas) && (window.scrollY < bigHeader)))
        console.log(scrollWas);
        if (window.scrollY  > forgetThreshold) {
            setScrollWas(scrollWas = false);
        }
    }

    function ScrollHandle() {
        let scrollWidth = Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
        );
        if (scrollWidth > 768) {
            CalculateScroll();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', ScrollHandle);
    },[]);

    const arrowTopClass = classNames({
        "scroll-button": true,
        "hidden": arrowTopIsHidden,
    })
    const arrowBottomClass = classNames({
        "scroll-button": true,
        "hidden": arrowBottomIsHidden,
    })
    return (
        <div className="scroll">
            <div id="arrowTop" className={arrowTopClass} onClick={goTop}>
                <VscTriangleUp className="scroll-button__img"/>
            </div>
            <div id="arrowBottom" className={arrowBottomClass} onClick={goBack}>
                <VscTriangleDown
                     className="scroll-button__img scroll-button__img--down"/>
            </div>
        </div>
    )
}