import React from "react";
import "./Main__Scroll.scss"
import { VscTriangleUp } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import classNames from "classnames";

export default class Main__Scroll extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            scrollWas: false,
            lastPoint: 0,
            arrowTopIsHidden: true,
            arrowBottomIsHidden: true,
        }
        this.ScrollHandle = this.ScrollHandle.bind(this);
        this.goTop = this.goTop.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    upThreshold = 500;
    forgetThreshold = 2000;
    bigHeader = 50;

    goTop() {
        this.setState({scrollWas: true});
        this.setState({lastPoint: window.scrollY});
        this.setState( {arrowBottomIsHidden: false});
        window.scrollTo(window.scrollX , 0);
        // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
    }

    goBack () {
        window.scrollTo(window.scrollX, this.state.lastPoint);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.ScrollHandle);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.ScrollHandle);
    }

    CalculateScroll() {
        this.setState({arrowTopIsHidden: (window.scrollY < this.upThreshold)});
        if (window.scrollY  > this.forgetThreshold) {
            this.setState({scrollWas: false});
        }
        this.setState({arrowBottomIsHidden: !((this.state.scrollWas) && (window.scrollY < this.bigHeader))});
    }

    ScrollHandle() {
        console.log(window.scrollY);
        let scrollWidth = Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
        );
        if (scrollWidth > 768) {
            this.CalculateScroll();
        }
    }

    render() {
        const arrowTopClass = classNames({
            "scroll-button": true,
            "hidden": this.state.arrowTopIsHidden,
        })
        const arrowBottomClass = classNames({
            "scroll-button": true,
            "hidden": this.state.arrowBottomIsHidden,
        })
        return (
            <div className="scroll">
                <div id="arrowTop" className={arrowTopClass} onClick={this.goTop}>
                    <VscTriangleUp className="scroll-button__img"/>
                </div>
                <div id="arrowBottom" className={arrowBottomClass} onClick={this.goBack}>
                    <VscTriangleDown
                         className="scroll-button__img scroll-button__img&#45;&#45;down"/>
                </div>
            </div>
        )
    }
}