import React, {useContext} from "react";
import {userContext} from "../../Context/UserContext";
import ChangePassword from "../common/ChangePassword";
import ModalTitle from "../common/ModalTitle";

const SettingsPassword = () => {
    const userID = useContext(userContext).userID;

    return (
        <>
            <ModalTitle>Change password</ModalTitle>
            <ChangePassword userID={userID}/>
        </>
    )
}

export default SettingsPassword