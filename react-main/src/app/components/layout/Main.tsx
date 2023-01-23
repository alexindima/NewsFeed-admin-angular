import React from "react";
import Scroll from "./main/Scroll";
import Articles from "./main/Articles";
import "./Main.scss";

const Main = () => {
    return (
        <div className="layout__main main">
            <Scroll/>
            <Articles/>
        </div>
    );
};

export default Main;
