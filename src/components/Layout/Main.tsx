import React from "react";
import Scroll from "./Main/Scroll";
import Articles from "./Main/Articles";
import "./Main.scss"


const Main = () => {
    return (
        <div className="layout__main main">
            <Scroll />
            <Articles />
        </div>
    )
}

export default Main