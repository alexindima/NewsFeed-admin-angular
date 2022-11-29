import React, {useContext} from "react";
import "./Modal__SettingsPassword.scss"
import { UserContext } from "../../Context/Context";
import Form__SetPassword from "./Form__SetPassword";

// Нужен рефакторинг классов
const Modal__SettingsPassword = () => {
    const userID = useContext(UserContext).userID;

    return (
        <div>
            <div className="modal-window__main-title">
                Change password
            </div>
            <Form__SetPassword userID={userID} />
        </div>
    )
}

export default Modal__SettingsPassword