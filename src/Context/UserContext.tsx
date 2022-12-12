import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {IUser} from "../types/IUser";
import {IContextProps} from "../types/IContextProps"
import {useLocalStorage} from "../hooks/useLocalStorage";
import {apiContext} from "./ApiContext";

export const userContext = createContext<any>({});

const UserContext = (props: IContextProps) => {
    const [loadingIsAllowed, setLoadingIsAllowed] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)
    const [savedID, setSavedID] = useLocalStorage("ID", null);

    const fetchAllUsers = useContext(apiContext).fetchAllUsers

    useEffect(() => {
        if (savedID) {
            if (savedID !== 1) { //админа сохранять нельзя для безопасности
                const fetchData = async () => {
                    const allUsers = await fetchAllUsers()
                    let userIsExist = false
                    allUsers.every((user: IUser) => {
                        if (user.id === savedID) {
                            userIsExist = true
                            setUser(user)
                            setLoadingIsAllowed(true)
                            return false
                        }
                        return true
                    })
                    if (!userIsExist) setSavedID(null)
                }
                fetchData()
            }
        } else {
            setLoadingIsAllowed(true)
        }
        // eslint-disable-next-line
    }, [])

    const logIn = (loggedUser: IUser) => {
        setUser(loggedUser)
        setSavedID(loggedUser.id)
    }

    const logOut = () => {
        setUser(null)
        setSavedID(null)
    }

    const value = {
        loadingIsAllowed,
        user,
        logIn,
        logOut,
    }

    return (
        <userContext.Provider value={value}> {props.children} </userContext.Provider>
    )
}

export default UserContext