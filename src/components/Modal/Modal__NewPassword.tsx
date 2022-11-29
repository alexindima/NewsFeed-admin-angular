import React from "react";
import "./Modal__NewPassword.scss"
import Form__SetPassword from "./Form__SetPassword";

interface IUserIDProps {
    userID: number
}

const Modal__NewPassword = (props: IUserIDProps) => {
    const recoveredUser = props.userID

    return (
        <div>
            <div className="modal-window__main-title">
                Set new password
            </div>
            <Form__SetPassword userID={recoveredUser} />
        </div>
    )
}

export default Modal__NewPassword