import React, {useContext, useState} from "react";
import { RiCloseCircleLine, RiArrowLeftCircleLine } from "react-icons/ri"
import Login from "./Login";
import Signup from "./Signup";
import Recovery from "./Recovery";
import NewPassword from "./NewPassword";
import SettingsMain from "./SettingsMain";
import SettingsName from "./SettingsName";
import SettingsPassword from "./SettingsPassword";
import styles from "./Modal.module.scss"
import {modalContext} from "../../Context/ModalContext";

const Modal = () => {
    const [recoveredUser, setRecoveredUser] = useState(0)

    const currentModal                  = useContext(modalContext).currentModal
    const openLoginModal                = useContext(modalContext).openLoginModal;
    const openSettingsMainModal         = useContext(modalContext).openSettingsMainModal;
    const hideModal                     = useContext(modalContext).hideModal;

    const goBack = () => {
        if (currentModal==="settingsName" || currentModal==="settingsPassword") {
            openSettingsMainModal()
        }
        else {
            openLoginModal()
        }
    }

    return (
        <>
            {!!currentModal &&
                <div className={styles.modalArea}>
                    <div className={styles.modalWindow}>
                        <div className={styles.modalWindow__close}>
                            <RiCloseCircleLine onClick={hideModal} title="Close"/>
                        </div>
                        {!(currentModal==="login" || currentModal==="settingsName") &&
                            <div className={styles.modalWindow__back}>
                                <RiArrowLeftCircleLine onClick={goBack} title="Back"/>
                            </div>
                        }
                        {currentModal==="login" && <Login/>}
                        {currentModal==="signup" && <Signup/>}
                        {currentModal==="recovery" && <Recovery setUser={setRecoveredUser} />}
                        {currentModal==="newPassword" && <NewPassword userID={recoveredUser} />}
                        {currentModal==="settingsMain" && <SettingsMain />}
                        {currentModal==="settingsName" && <SettingsName />}
                        {currentModal==="settingsPassword" && <SettingsPassword />}
                    </div>
                </div>}
        </>
    )
}

export default Modal