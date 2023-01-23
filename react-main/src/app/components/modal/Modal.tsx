import React, {useContext} from "react";
import {RiCloseCircleLine, RiArrowLeftCircleLine} from "react-icons/ri";
import Login from "./Login";
import SettingsMain from "./SettingsMain";
import styles from "./Modal.module.scss";
import {modalContext} from "../../context/ModalContext";

const Modal = () => {
    const currentModal = useContext(modalContext).currentModal;
    const setCurrentModal = useContext(modalContext).setCurrentModal;
    const openLoginModal = () => {
        setCurrentModal(<Login/>);
    };
    const openSettingsMainModal = () => {
        setCurrentModal(<SettingsMain/>);
    };
    const hideModal = () => {
        setCurrentModal(null);
    };
    const goBack = () => {
        if (
            currentModal?.type.name === "SettingsName" ||
            currentModal?.type.name === "SettingsPassword"
        ) {
            openSettingsMainModal();
        } else {
            openLoginModal();
        }
    };

    return (
        <>
            {!!currentModal && (
                <div className={styles.modalArea}>
                    <div className={styles.modalWindow}>
                        <div className={styles.modalWindow__close}>
                            <RiCloseCircleLine onClick={hideModal} title="Close"/>
                        </div>
                        {!(
                            currentModal.type.name === "Login" ||
                            currentModal.type.name === "SettingsMain"
                        ) && (
                            <div className={styles.modalWindow__back}>
                                <RiArrowLeftCircleLine onClick={goBack} title="Back"/>
                            </div>
                        )}
                        {currentModal}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
