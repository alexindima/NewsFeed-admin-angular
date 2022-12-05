import React from "react";
import "./NewPassword.scss"
import ChangePassword from "./Form/ChangePassword";

interface IUserIDProps {
    userID: number
}

const NewPassword = (props: IUserIDProps) => {
    const recoveredUser = props.userID

    return (
        <>
            <div className="modal-window__main-title">
                Set new password
            </div>
            <ChangePassword userID={recoveredUser} />
        </>
    )
}

export default NewPassword