import * as React from "react";
import {createContext, useState} from "react";
import {IContextProps} from "../types/IContextProps";

export const modalContext = createContext<any>({});

const ModalContext = (props: IContextProps) => {
    const [loginModalIsOpened, setLoginModalIsOpened]                       = useState(false)
    const [signupModalIsOpened, setSignupModalIsOpened]                     = useState(false)
    const [recoveryModalIsOpened, setRecoveryModalIsOpened]                 = useState(false)
    const [newPasswordModalIsOpened, setNewPasswordModalIsOpened]           = useState(false)
    const [settingsMainModalIsOpened, setSettingsMainModalIsOpened]         = useState(false)
    const [settingsNameModalIsOpened, setSettingsNameModalIsOpened]         = useState(false)
    const [settingsPasswordModalIsOpened, setSettingsPasswordModalIsOpened] = useState(false)

    const openLoginModal = () => {
        document.body.classList.add('modal-open')
        setLoginModalIsOpened(true)
        setSignupModalIsOpened(false)
        setRecoveryModalIsOpened(false)
        setNewPasswordModalIsOpened(false)
        setSettingsMainModalIsOpened(false)
        setSettingsNameModalIsOpened(false)
        setSettingsPasswordModalIsOpened(false)
    }
    const openSignupModal = () => {
        document.body.classList.add('modal-open')
        setLoginModalIsOpened(false)
        setSignupModalIsOpened(true)
        setRecoveryModalIsOpened(false)
        setNewPasswordModalIsOpened(false)
        setSettingsMainModalIsOpened(false)
        setSettingsNameModalIsOpened(false)
        setSettingsPasswordModalIsOpened(false)
    }
    const openRecoveryModal = () => {
        document.body.classList.add('modal-open')
        setLoginModalIsOpened(false)
        setSignupModalIsOpened(false)
        setRecoveryModalIsOpened(true)
        setNewPasswordModalIsOpened(false)
        setSettingsMainModalIsOpened(false)
        setSettingsNameModalIsOpened(false)
    }
    const openNewPasswordModal = () => {
        document.body.classList.add('modal-open')
        setLoginModalIsOpened(false)
        setSignupModalIsOpened(false)
        setRecoveryModalIsOpened(false)
        setNewPasswordModalIsOpened(true)
        setSettingsMainModalIsOpened(false)
        setSettingsNameModalIsOpened(false)
        setSettingsPasswordModalIsOpened(false)
    }
    const openSettingsMainModal = () => {
        document.body.classList.add('modal-open')
        setLoginModalIsOpened(false)
        setSignupModalIsOpened(false)
        setRecoveryModalIsOpened(false)
        setNewPasswordModalIsOpened(false)
        setSettingsMainModalIsOpened(true)
        setSettingsNameModalIsOpened(false)
        setSettingsPasswordModalIsOpened(false)
    }
    const openSettingsNameModal = () => {
        document.body.classList.add('modal-open')
        setLoginModalIsOpened(false)
        setSignupModalIsOpened(false)
        setRecoveryModalIsOpened(false)
        setNewPasswordModalIsOpened(false)
        setSettingsMainModalIsOpened(false)
        setSettingsNameModalIsOpened(true)
        setSettingsPasswordModalIsOpened(false)
    }
    const openSettingsPasswordModal = () => {
        document.body.classList.add('modal-open')
        setLoginModalIsOpened(false)
        setSignupModalIsOpened(false)
        setRecoveryModalIsOpened(false)
        setNewPasswordModalIsOpened(false)
        setSettingsMainModalIsOpened(false)
        setSettingsNameModalIsOpened(false)
        setSettingsPasswordModalIsOpened(true)
    }
    const hideModal = () => {
        document.body.classList.remove('modal-open')
        setLoginModalIsOpened(false)
        setSignupModalIsOpened(false)
        setRecoveryModalIsOpened(false)
        setNewPasswordModalIsOpened(false)
        setSettingsMainModalIsOpened(false)
        setSettingsNameModalIsOpened(false)
        setSettingsPasswordModalIsOpened(false)
    }

    const value = {
        loginModalIsOpened,
        signupModalIsOpened,
        recoveryModalIsOpened,
        newPasswordModalIsOpened,
        settingsMainModalIsOpened,
        settingsNameModalIsOpened,
        settingsPasswordModalIsOpened,
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