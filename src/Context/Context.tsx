import * as React from "react";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {IUser} from "../type/IUser";

export const UserContext = createContext<any>({});

interface IContextProps {
    children?: JSX.Element
}

//наверно стоит разбить на разные контексты (юзер, категории, модалки)
const Context = (props: IContextProps) => {
    const [loginModalIsOpened, setLoginModalIsOpened] = useState(false)
    const [signupModalIsOpened, setSignupModalIsOpened] = useState(false)
    const [recoveryModalIsOpened, setRecoveryModalIsOpened] = useState(false)
    const [newPasswordModalIsOpened, setNewPasswordModalIsOpened] = useState(false)
    const [settingsMainModalIsOpened, setSettingsMainModalIsOpened] = useState(false)
    const [settingsNameModalIsOpened, setSettingsNameModalIsOpened] = useState(false)
    const [settingsPasswordModalIsOpened, setSettingsPasswordModalIsOpened] = useState(false)

    const [currentCategory, setCurrentCategory] = useState("")

    const [userIsLogged, setUserIsLogged] = useState(false)
    const [userID, setUserID] = useState(0)
    const [userName, setUserName] = useState("")
    const [userIgnoredCategories, setUserIgnoredCategories] = useState([""])
    const [userIgnoredTags, setUserIgnoredTags] = useState([""])

    useEffect(() => {
        const data = localStorage.getItem("userID")
        if (data) {
            const savedUser = JSON.parse(data);
            if (savedUser !== 1) { //админа сохранять нельзя для безопасности
                const fetchData = async () => {
                    const result = await axios(
                        'http://localhost:3030/users',
                    );

                    /*  Это должен делать бэк
                     */
                    result.data.every((user:IUser) => {
                        if (user.id === savedUser) {
                            setUserID(user.id)
                            setUserName(user.name)
                            setUserIgnoredCategories(user.ignoredCategories)
                            setUserIgnoredTags(user.ignoredTags)
                            setUserIsLogged(true)
                            return false
                        }
                        return true
                    })
                };
                fetchData();
            }
        }
    }, [])

    const chooseCategory = (category:string) => {
        setCurrentCategory(category)
    }

    const clearCategory = () => {
        setCurrentCategory("")
    }

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


    const logIn = (loggedUser:IUser) => {
        hideModal()
        setUserID(loggedUser.id)
        setUserName(loggedUser.name)
        setUserIgnoredCategories(loggedUser.ignoredCategories)
        setUserIgnoredTags(loggedUser.ignoredTags)
        localStorage.setItem("userID", JSON.stringify(loggedUser.id))
        setUserIsLogged(true)
    }

    const logOut = () => {
        setUserID(0)
        setUserName("")
        setUserIgnoredCategories([""])
        setUserIgnoredTags([""])
        localStorage.setItem("userID", JSON.stringify(0))
        setUserIsLogged(false)
    }

    const value = {
        userIsLogged,
        userID,
        userName,
        userIgnoredCategories,
        userIgnoredTags,
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
        logIn,
        logOut,
        currentCategory,
        chooseCategory,
        clearCategory,
    }

    return (
        <UserContext.Provider value={value} > {props.children} </UserContext.Provider>
    )
}

export default Context