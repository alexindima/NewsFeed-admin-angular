import React from "react";
import { BiUserCircle } from 'react-icons/bi';
import ReactDOM from "react-dom";
import {useStore} from "react-redux";

export function Header__User () {
    return (
        <div className="icon-wrapper">
            <BiUserCircle id="user" className="icon-wrapper__img" title="User" />
        </div>
    )
}
