import React, {useContext} from "react";
import {userContext} from "../../context/UserContext";
import ChangePassword from "../common/ChangePassword";
import ModalTitle from "../common/ModalTitle";

const SettingsPassword = () => {
    const userID = useContext(userContext).user?.id;
    return (
        <>
            <ModalTitle>Change password</ModalTitle>
            <ChangePassword userID={userID!}/>
        </>
    );
};

export default SettingsPassword;
