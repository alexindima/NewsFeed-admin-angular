import * as React from "react";
import Main from "./Main";
import Suggested from "./Suggested";
import Back from "./Back";
import "./Layout.scss"
import {useContext} from "react";
import {siteContext} from "../../Context/SiteContext";

const Layout = () => {
    const siteState = useContext(siteContext).siteState;

    return (
        <div className="layout">
            <Main/>
            <Suggested/>
            {!!siteState && <Back/>}
        </div>
    )
}

export default Layout