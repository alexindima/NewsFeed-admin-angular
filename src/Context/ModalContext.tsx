import * as React from "react";
import {createContext, useState} from "react";
import {IContextProps} from "../types/IContextProps";

export const modalContext = createContext<any>({});

/* Реакт не ангуляр, тут нет удобного открытия модалок как у ангуляра
* если использовать Dialog из React Material, появляется огромная проблема
* с открытием модалки из модалки, закрывая первую модалку, приходится
* распологать модалки рядом и прокидывать пропс в родитель, сильно
* усложняя код и его читаемость*/

const ModalContext = (props: IContextProps) => {
    const [currentModal, setCurrentModal] = useState<string|null>(null)

    const openLoginModal = () => {
        document.body.classList.add('modal-open')
        setCurrentModal("login")
    }
    const openSignupModal = () => {
        document.body.classList.add('modal-open')
        setCurrentModal("signup")
    }
    const openRecoveryModal = () => {
        document.body.classList.add('modal-open')
        setCurrentModal("recovery")
    }
    const openNewPasswordModal = () => {
        document.body.classList.add('modal-open')
        setCurrentModal("newPassword")
    }
    const openSettingsMainModal = () => {
        document.body.classList.add('modal-open')
        setCurrentModal("settingsMain")
    }
    const openSettingsNameModal = () => {
        document.body.classList.add('modal-open')
        setCurrentModal("settingsName")
    }
    const openSettingsPasswordModal = () => {
        document.body.classList.add('modal-open')
        setCurrentModal("settingsPassword")
    }
    const hideModal = () => {
        document.body.classList.remove('modal-open')
        setCurrentModal(null)
    }

    const value = {
        currentModal,
        openLoginModal,
        openSignupModal,
        openRecoveryModal,
        openNewPasswordModal,
        openSettingsMainModal,
        openSettingsNameModal,
        openSettingsPasswordModal,
        hideModal,
    }

    return (
        <modalContext.Provider value={value} > {props.children} </modalContext.Provider>
    )
}

export default ModalContext