import * as React from "react";
import Logo from "../../../assets/img/logo.jpg";
import User from "./User";
import Search from "./Search";
import Categories from "./Categories";
import "./Header.scss";
import classNames from "classnames";
import {useContext, useEffect, useState} from "react";
import {siteContext} from "../../context/SiteContext";
import PopupCloser from "../common/PopupCloser";

const Header = () => {
    const DOWN_THRESHOLD = 200;
    const BIG_HEADER = 50;

    const [headerIsSmall, setHeaderIsSmall] = useState(false);

    const goHome = useContext(siteContext).goHome;

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
                CalculateHeader();
            }
        };
        window.addEventListener("scroll", ScrollHandle);
        return () => {
            window.removeEventListener("scroll", ScrollHandle);
        };
    }, []);

    const CalculateHeader = () => {
        if (window.scrollY > DOWN_THRESHOLD) {
            setHeaderIsSmall(true);
        } else {
            /* Гистерезис */
            if (window.scrollY < BIG_HEADER) {
                setHeaderIsSmall(false);
            }
        }
    };

    const headerClass = classNames({
        "header-wrapper__header": true,
        header: true,
        "header--small": headerIsSmall,
    });
    const headerLogoClass = classNames({
        "header__logo-img": true,
        "header__logo-img--small": headerIsSmall,
    });

    return (
        <header className="header-wrapper">
            <div className={headerClass}>
                <div onClick={goHome} className="header__logo">
                    <img src={Logo} alt="Logo" className={headerLogoClass}/>
                </div>
                <div className="spacer"></div>
                <div className="header__icons icons-container">
                    <PopupCloser>
                        <User wasClick/>
                    </PopupCloser>
                    <PopupCloser>
                        <Search wasClick/>
                    </PopupCloser>
                    <PopupCloser>
                        <Categories wasClick/>
                    </PopupCloser>
                </div>
            </div>
        </header>
    );
};

export default Header;
