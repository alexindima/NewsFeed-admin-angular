import * as React from "react";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {IUser} from "../types/IUser";
import {IContextProps} from "../types/IContextProps";

export const userContext = createContext<any>({});

const UserContext = (props: IContextProps) => {
    const [user, setUser] = useState<IUser | null>(null)

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
                    result.data.every((user: IUser) => {
                        if (user.id === savedUser) {
                            setUser(user)
                            return false
                        }
                        return true
                    })
                };
                fetchData();
            }
        }
    }, [])

    const logIn = (loggedUser: IUser) => {
        setUser(loggedUser)
        localStorage.setItem("userID", JSON.stringify(loggedUser.id))
    }

    const logOut = () => {
        setUser(null)
        localStorage.removeItem("userID")
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