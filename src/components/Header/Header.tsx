import * as React from "react";
import Logo from '../../img/logo.jpg'

import { Header__User } from "./Header__User"
import { Header__Search } from "./Header__Search"
import { Header__Category } from "./Header__Category"
import './Header.scss'
import classNames from "classnames";
import {useEffect, useState} from "react";

export function Header () {
    const DOWN_THRESHOLD = 200;
    const BIG_HEADER = 50;

    let [headerIsSmall, setHeaderIsSmall] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', ScrollHandle);
    },[]);

    function CalculateHeader () {
        if (window.scrollY  > DOWN_THRESHOLD) {
            setHeaderIsSmall(headerIsSmall = true);
        }
        else { /* Гистерезис */
            if (window.scrollY  < BIG_HEADER) {
                setHeaderIsSmall(headerIsSmall = false);
            }
        }
    }

    function ScrollHandle() {
        let scrollWidth = Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
        );
        if (scrollWidth > 768) {
            CalculateHeader();
        }
    }

    const headerClass = classNames({
        "header-wrapper__header": true,
        "header": true,
        "header--small": headerIsSmall,
    })
    const headerLogoClass = classNames({
        "header__logo-img": true,
        "header__logo-img--small": headerIsSmall,
    })
    return (
        <header className="header-wrapper">
            <div className={headerClass}>
                <div className="header__logo">
                    <a href="././index.html"><img src={Logo} alt="Logo" className={headerLogoClass} /></a>
                </div>
                <div className="spacer"></div>
                <div className="header__icons icons-container">
                    <Header__User />
                    <Header__Search />
                    <Header__Category />
                </div>
            </div>
        </header>
    )
}