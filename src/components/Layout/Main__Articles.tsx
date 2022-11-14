import React from "react";
import "./Main__Articles.scss"
import Articles__Article from "./Articles__Article";

export default class Main__Articles extends React.Component{
    render() {
        return (
            <div>
                <Articles__Article />
                <Articles__Article />
                <Articles__Article />
                <Articles__Article />
                <Articles__Article />
                <Articles__Article />
                <Articles__Article />

            </div>
        )
    }
}