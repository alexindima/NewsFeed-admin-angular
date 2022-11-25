import React from "react";
import Main__Scroll from "./Main__Scroll";
import Main__Articles from "./Main__Articles";
import "./Layout__Main.scss"


const Layout__Main = () => {
    return (
        <div className="layout__main main">
            <Main__Scroll />
            <Main__Articles />
        </div>
    )
}

export default Layout__Main