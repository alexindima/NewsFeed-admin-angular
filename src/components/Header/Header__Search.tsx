import React from "react";
import { HiOutlineSearchCircle } from 'react-icons/hi';
import "./Header__Search.scss"
import classNames from "classnames";

export default class Header__Search extends React.Component<any,any>{
    constructor(props) {
        super(props);
        this.state={
            searchIsClosed: true,
        }
        this.showOrHideSearch = this.showOrHideSearch.bind(this);
    }

    showOrHideSearch () {
        this.setState({searchIsClosed: !this.state.searchIsClosed})
    };

    render() {
        const searchWindowClass = classNames({
            "icon-wrapper__popup": true,
            "hidden": this.state.searchIsClosed,
        })
        return (
            <div className="icon-wrapper" onClick={this.showOrHideSearch}>
                <HiOutlineSearchCircle id="search" className="icon-wrapper__img" title="Search" />
                <div id="search-window" className={searchWindowClass}>
                    <div className="search-window">
                        <form method="get" className="search-form">
                            <label>
                                <input type="text" className="search-form__input" placeholder="Search"/>
                            </label>
                            <button type="submit" className="search-form__button">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
