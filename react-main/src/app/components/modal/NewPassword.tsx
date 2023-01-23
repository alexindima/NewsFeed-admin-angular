import React from "react";
import ChangePassword from "../common/ChangePassword";
import ModalTitle from "../common/ModalTitle";

interface IUserIDProps {
    userID: number;
}

const NewPassword = (props: IUserIDProps) => {
    const recoveredUser = props.userID;

    return (
        <>
            <ModalTitle>Set new password</ModalTitle>
            <ChangePassword userID={recoveredUser}/>
        </>
    );
};

export default NewPassword;
