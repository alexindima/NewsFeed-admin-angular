import React from "react";
import { CgMenuRound } from 'react-icons/cg';
import "./Header__Category.scss"
import classNames from "classnames";

export default class Header__Category extends React.Component<any,any>{
    constructor(props) {
        super(props);
        this.state={
            categoryIsClosed: true,
        }
        this.showOrHideCategory = this.showOrHideCategory.bind(this);
    }

    showOrHideCategory () {
        this.setState({categoryIsClosed: !this.state.categoryIsClosed})
    };

    render() {
        const categoryWindowClass = classNames({
            "icon-wrapper__popup": true,
            "hidden": this.state.categoryIsClosed,
        })
        return (
            <div className="icon-wrapper"  onClick={this.showOrHideCategory}>
                <CgMenuRound id="dropdown" className="icon-wrapper__img" title="Category"/>
                <div id="category-window" className={categoryWindowClass}>
                    <div className="category-dropdown">
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Politics</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">In the world</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Economy</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Society</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Incidents</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Army</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Science</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Sport</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Culture</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Religion</a>
                        <a href="src/components/Header/Header#Header.txs" className="category-dropdown__element">Tourism</a>
                    </div>
                </div>
            </div>
        )
    }
}
