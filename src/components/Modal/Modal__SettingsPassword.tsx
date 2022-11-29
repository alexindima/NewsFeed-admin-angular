import React, {useContext, useState} from "react";
import "./Modal__SettingsPassword.scss"
import axios from "axios";
import { UserContext } from "../../Context/Context";
import {validUserName} from "../../Regex/Regex";
import Form__SetPassword from "./Form__SetPassword";

// Нужен рефакторинг классов
const Modal__SettingsPassword = () => {
    const user = useContext(UserContext).user;
    const logIn = useContext(UserContext).logIn;
    const hideModal =  useContext(UserContext).hideModal;

    const changedUser = user.current.id

    return (
        <div>
            <div className="modal-window__main-title">
                Change password
            </div>
            <Form__SetPassword userID={changedUser} loginFunction={logIn} hideModalFunction={hideModal}/>
        </div>
    )
}

export default Modal__SettingsPassword