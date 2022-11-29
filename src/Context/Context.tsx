import * as React from "react";
import {createContext, useEffect, useRef, useState} from "react";
import axios from "axios";

export const UserContext = createContext<any>({});

//наверно стоит разбить на разные контексты (юзер, категории, модалки)
const Context = (props) => {
    const [userIsLogged, setUserIsLogged] = useState(false)
    const [loginModalIsOpened, setLoginModalIsOpened] = useState(false)
    const [signupModalIsOpened, setSignupModalIsOpened] = useState(false)
    const [recoveryModalIsOpened, setRecoveryModalIsOpened] = useState(false)
    const [newPasswordModalIsOpened, setNewPasswordModalIsOpened] = useState(false)
    const [settingsMainModalIsOpened, setSettingsMainModalIsOpened] = useState(false)
    const [settingsNameModalIsOpened, setSettingsNameModalIsOpened] = useState(false)
    const [settingsPasswordModalIsOpened, setSettingsPasswordModalIsOpened] = useState(false)
    const [currentCategory, setCurrentCategory] = useState("")
    const user = useRef({  //подумать насчет переделки на стейт
        id: 0,
        name: "",
        ignoredCategories: [""],
        ignoredTags: [""]
    })

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
                    result.data.every(el => {
                        if (el.id === savedUser) {
                            user.current.id = el.id
                            user.current.name = el.name
                            user.current.ignoredCategories = el.ignoredCategories
                            user.current.ignoredTags = el.ignoredTags
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

    const chooseCategory = (category) => {
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


    const logIn = (loggedUser) => {
        hideModal()
        user.current.id = loggedUser.id
        user.current.name = loggedUser.name
        user.current.ignoredCategories = loggedUser.ignoredCategories
        user.current.ignoredTags = loggedUser.ignoredTags
        localStorage.setItem("userID", JSON.stringify(user.current.id))
        setUserIsLogged(true)
    }

    const logOut = () => {
        user.current.id = 0
        user.current.name = ""
        user.current.ignoredCategories = []
        user.current.ignoredTags = []
        localStorage.setItem("userID", JSON.stringify(user.current.id))
        setUserIsLogged(false)
    }

    const value = {
        userIsLogged,
        user,
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