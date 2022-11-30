import React, {useContext} from "react";
import "./SettingsPassword.scss"
import { userContext } from "../../Context/UserContext";
import Form__SetPassword from "./Form/ChangePassword";

// Нужен рефакторинг классов
const SettingsPassword = () => {
    const userID = useContext(userContext).userID;

    return (
        <div>
            <div className="modal-window__main-title">
                Change password
            </div>
            <Form__SetPassword userID={userID} />
        </div>
    )
}

export default SettingsPassword