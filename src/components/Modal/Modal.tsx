import React, {useContext, useState} from "react";
import { RiCloseCircleLine, RiArrowLeftCircleLine } from "react-icons/ri"
import Modal__Login from "./Modal__Login";
import Modal__Signup from "./Modal__Signup";
import Modal__Recovery from "./Modal__Recovery";
import Modal__NewPassword from "./Modal__NewPassword";
import Modal__SettingsMain from "./Modal__SettingsMain";
import Modal__SettingsName from "./Modal__SettingsName";
import Modal__SettingsPassword from "./Modal__SettingsPassword";
import "./Modal.scss"
import classNames from "classnames";
import { UserContext } from "../../Context/Context";

// нужен рефакторинг классов
const Modal = () => {
    const [recoveredUser, setRecoveredUser] = useState(0)

    const loginModalIsOpened = useContext(UserContext).loginModalIsOpened
    const signupModalIsOpened = useContext(UserContext).signupModalIsOpened
    const recoveryModalIsOpened = useContext(UserContext).recoveryModalIsOpened
    const newPasswordModalIsOpened = useContext(UserContext).newPasswordModalIsOpened
    const settingsMainModalIsOpened = useContext(UserContext).settingsMainModalIsOpened
    const settingsNameModalIsOpened = useContext(UserContext).settingsNameModalIsOpened
    const settingsPasswordModalIsOpened = useContext(UserContext).settingsPasswordModalIsOpened
    const openLoginModal =  useContext(UserContext).openLoginModal;
    const openSettingsMainModal =  useContext(UserContext).openSettingsMainModal;
    const hideModal =  useContext(UserContext).hideModal;

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
                {loginModalIsOpened && <Modal__Login/>}
                {signupModalIsOpened && <Modal__Signup/>}
                {recoveryModalIsOpened && <Modal__Recovery setUser={setRecoveredUser} />}
                {newPasswordModalIsOpened && <Modal__NewPassword user={recoveredUser} />}
                {settingsMainModalIsOpened && <Modal__SettingsMain />}
                {settingsNameModalIsOpened && <Modal__SettingsName />}
                {settingsPasswordModalIsOpened && <Modal__SettingsPassword />}
            </div>
        </div>
    )
}

export default Modal