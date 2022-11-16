import React, {useState} from "react";
import { HiOutlineSearchCircle } from 'react-icons/hi';
import "./Header__Search.scss"
import classNames from "classnames";

export function Header__Search () {
    let [searchIsClosed, setSearchIsClosed] = useState(true)

    function showOrHideSearch () {
        setSearchIsClosed(searchIsClosed = !searchIsClosed)
    }

    const searchWindowClass = classNames({
        "icon-wrapper__popup": true,
        "hidden": searchIsClosed,
    })
    return (
        <div className="icon-wrapper" onClick={showOrHideSearch}>
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
