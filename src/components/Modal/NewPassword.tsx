import React from "react";
import "./NewPassword.scss"
import Form__SetPassword from "./Form/ChangePassword";

interface IUserIDProps {
    userID: number
}

const NewPassword = (props: IUserIDProps) => {
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

export default NewPassword