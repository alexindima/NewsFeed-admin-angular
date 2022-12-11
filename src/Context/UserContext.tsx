import * as React from "react";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {IUser} from "../types/IUser";
import {IContextProps} from "../types/IContextProps"
import {useLocalStorage} from "../hooks/useLocalStorage";

export const userContext = createContext<any>({});

const UserContext = (props: IContextProps) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [savedID, setSavedID] = useLocalStorage("ID", null);

    useEffect(() => {
        if (savedID) {
            if (savedID !== 1) { //админа сохранять нельзя для безопасности
                const fetchData = async () => {
                    const result = await axios('http://localhost:3030/users')
                    let userIsExist = false
                    result.data.every((user: IUser) => {
                        if (user.id === savedID) {
                            userIsExist = true
                            setUser(user)
                            return false
                        }
                        return true
                    })
                    if (!userIsExist) setSavedID(null)
                }
                fetchData()
            }
        }
    }, [savedID])

    const logIn = (loggedUser: IUser) => {
        setUser(loggedUser)
        setSavedID(loggedUser.id)
    }

    const logOut = () => {
        setUser(null)
        setSavedID(null)
    }

    const value = {
        user,
        logIn,
        logOut,
    }

    return (
        <userContext.Provider value={value}> {props.children} </userContext.Provider>
    )
}

export default UserContext