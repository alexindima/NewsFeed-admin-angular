import * as React from "react";
import {createContext, useEffect, useRef, useState} from "react";
import axios from "axios";

export const UserContext = createContext<any>({});

const Context = (props) => {
    const [userIsLogged, setUserIsLogged] = useState(false)
    const [loginModalIsOpened, setLoginModalIsOpened] = useState(false)
    const user = useRef({
        id: 0,
        name: "",
        ignoredCategories: [""],
        ignoredTags: [""]
    })

    useEffect(() => {
        console.log('effect')
        const data = localStorage.getItem("userID")
        console.log(data)
        if (data) {
            const savedUser = JSON.parse(data);
            console.log(savedUser)
            if (savedUser.id !== 1) { //админа сохранять нельзя для безопасности
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


    const openLoginModal = () => {
        document.body.classList.add('modal-open');
        setLoginModalIsOpened(true)
    }
    const hideLoginModal = () => {
        document.body.classList.remove('modal-open');
        setLoginModalIsOpened(false)
    }


    const logIn = (loggedUser) => {
        hideLoginModal()
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
        openLoginModal,
        hideLoginModal,
        logIn,
        logOut,
    }

    return (
        <UserContext.Provider value={value} > {props.children} </UserContext.Provider>
    )
}

export default Context