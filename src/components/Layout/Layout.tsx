import * as React from "react";
import Main from "./Main";
import Suggested from "./Suggested";
import "./Layout.scss"

const Layout = () => {
    return (
        <div className="layout">
            <Main />
            <Suggested />
        </div>
    )
}

export default Layout