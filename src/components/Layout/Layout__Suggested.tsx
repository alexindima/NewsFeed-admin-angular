import React from "react";
import Suggested__News from "./Suggested__News";
import "./Layout__Suggested.scss"

export default class Layout__Suggested extends React.Component{
    render() {
        return (
            <div className="layout__suggested suggested">
                    <div className="suggested-container">
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                        <Suggested__News />
                    </div>
                </div>
        )
    }
}