import React from "react";
import { BiUserCircle } from 'react-icons/bi';
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";

export default class Header__User extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="icon-wrapper">
                <BiUserCircle id="user" className="icon-wrapper__img" title="User" />
            </div>
        )
    }
}
