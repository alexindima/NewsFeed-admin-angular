import * as React from "react";
import Logo from '../../img/logo.jpg'

import Header__User from "./Header__User"
import Header__Search from "./Header__Search"
import Header__Category from "./Header__Category"
import './Header.scss'
import classNames from "classnames";

interface headerProps {
    headerIsSmall: boolean,
}

export default class Header extends React.Component<any,headerProps>{
    render() {
        let headerIsSmall = this.props.headerIsSmall
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
}