import React, {useContext} from "react";
import "./SettingsPassword.scss"
import { userContext } from "../../Context/UserContext";
import ChangePassword from "./Form/ChangePassword";

const SettingsPassword = () => {
    const userID = useContext(userContext).userID;

    return (
        <div>
            <div className="modal-window__main-title">
                Change password
            </div>
            <ChangePassword userID={userID} />
        </div>
    )
}

export default SettingsPassword