import * as React from "react";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {IUser} from "../types/IUser";
import {IContextProps} from "../types/IContextProps";

export const userContext = createContext<any>({});

const UserContext = (props: IContextProps) => {
    const [userID, setUserID]                               = useState(0)
    const [userName, setUserName]                           = useState("")
    const [userIgnoredCategories, setUserIgnoredCategories] = useState([""])
    const [userIgnoredTags, setUserIgnoredTags]             = useState([""])

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
                            return false
                        }
                        return true
                    })
                };
                fetchData();
            }
        }
    }, [])

    const logIn = (loggedUser:IUser) => {
        setUserID(loggedUser.id)
        setUserName(loggedUser.name)
        setUserIgnoredCategories(loggedUser.ignoredCategories)
        setUserIgnoredTags(loggedUser.ignoredTags)
        localStorage.setItem("userID", JSON.stringify(loggedUser.id))
    }

    const logOut = () => {
        setUserID(0)
        setUserName("")
        setUserIgnoredCategories([""])
        setUserIgnoredTags([""])
        localStorage.setItem("userID", JSON.stringify(0))
    }

    const value = {
        userID,
        userName,
        userIgnoredCategories,
        userIgnoredTags,
        logIn,
        logOut,
    }

    return (
        <userContext.Provider value={value} > {props.children} </userContext.Provider>
    )
}

export default UserContext