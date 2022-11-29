import React, {useContext} from "react";
import "./Modal__NewPassword.scss"
import Form__SetPassword from "./Form__SetPassword";
import { UserContext } from "../../Context/Context";

// Нужен рефакторинг классов
const Modal__NewPassword = (props) => {
    const recoveredUser = props.user

    const logIn = useContext(UserContext).logIn
    const hideModal =  useContext(UserContext).hideModal

    return (
        <div>
            <div className="modal-window__main-title">
                Set new password
            </div>
            <Form__SetPassword userID={recoveredUser} loginFunction={logIn} hideModalFunction={hideModal}/>
        </div>
    )
}

export default Modal__NewPassword