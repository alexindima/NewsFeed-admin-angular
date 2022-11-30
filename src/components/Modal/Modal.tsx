import React, {useContext, useState} from "react";
import { RiCloseCircleLine, RiArrowLeftCircleLine } from "react-icons/ri"
import Login from "./Login";
import Signup from "./Signup";
import Recovery from "./Recovery";
import NewPassword from "./NewPassword";
import SettingsMain from "./SettingsMain";
import SettingsName from "./SettingsName";
import SettingsPassword from "./SettingsPassword";
import "./Modal.scss"
import classNames from "classnames";
import {modalContext} from "../../Context/ModalContext";

// нужен рефакторинг классов
const Modal = () => {
    const [recoveredUser, setRecoveredUser] = useState(0)

    const loginModalIsOpened            = useContext(modalContext).loginModalIsOpened
    const signupModalIsOpened           = useContext(modalContext).signupModalIsOpened
    const recoveryModalIsOpened         = useContext(modalContext).recoveryModalIsOpened
    const newPasswordModalIsOpened      = useContext(modalContext).newPasswordModalIsOpened
    const settingsMainModalIsOpened     = useContext(modalContext).settingsMainModalIsOpened
    const settingsNameModalIsOpened     = useContext(modalContext).settingsNameModalIsOpened
    const settingsPasswordModalIsOpened = useContext(modalContext).settingsPasswordModalIsOpened
    const openLoginModal                = useContext(modalContext).openLoginModal;
    const openSettingsMainModal         = useContext(modalContext).openSettingsMainModal;
    const hideModal                     = useContext(modalContext).hideModal;

    const modalClass = classNames({
        "modal-area": true,
        "hidden": !(loginModalIsOpened || signupModalIsOpened || recoveryModalIsOpened
            || newPasswordModalIsOpened || settingsMainModalIsOpened || settingsNameModalIsOpened
            || settingsPasswordModalIsOpened),
    })

    const goBack = () => {
        if (settingsNameModalIsOpened || settingsPasswordModalIsOpened) {
            openSettingsMainModal()
        }
        else {
            openLoginModal()
        }
    }

    return (
        <div className={modalClass}>
            <div className="modal-window">
                <div className="modal-window__close" >
                    <RiCloseCircleLine onClick={hideModal} title="Close"/>
                </div>
                {!(loginModalIsOpened || settingsMainModalIsOpened) &&
                    <div className="modal-window__back">
                        <RiArrowLeftCircleLine onClick={goBack} title="Back"/>
                    </div>
                }
                {loginModalIsOpened && <Login/>}
                {signupModalIsOpened && <Signup/>}
                {recoveryModalIsOpened && <Recovery setUser={setRecoveredUser} />}
                {newPasswordModalIsOpened && <NewPassword userID={recoveredUser} />}
                {settingsMainModalIsOpened && <SettingsMain />}
                {settingsNameModalIsOpened && <SettingsName />}
                {settingsPasswordModalIsOpened && <SettingsPassword />}
            </div>
        </div>
    )
}

export default Modal