import * as React from "react";
import Main from "./Main";
import Suggested from "./Suggested";
import Back from "./Back";
import "./Layout.scss"
import {useContext} from "react";
import {siteContext} from "../../Context/SiteContext";

const Layout = () => {
    const currentCategory   = useContext(siteContext).currentCategory;
    const currentTag        = useContext(siteContext).currentTag;
    const searchPhrase      = useContext(siteContext).searchPhrase;
    const articleToShowID   = useContext(siteContext).articleToShow;

    return (
        <div className="layout">
            <Main />
            <Suggested />
            {!!(currentCategory || currentTag || searchPhrase || articleToShowID) && <Back />}
        </div>
    )
}

export default Layout