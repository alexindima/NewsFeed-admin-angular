import * as React from "react";
import {createContext, MouseEventHandler, useEffect, useState} from "react";
import {User} from "../../types/User";
import {ContextProps} from "../../types/ContextProps";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import useApi from "../../hooks/useApi";
import usersApi from "../../api/users"

interface IUserContext {
    loadingIsAllowed: boolean;
    user: User | null;
    logIn: Function;
    logOut: MouseEventHandler<HTMLButtonElement>;
}

export const userContext = createContext<IUserContext>({
    loadingIsAllowed: false,
    user: null,
    logIn: () => {
    },
    logOut: () => {
    },
});

const UserContext = (props: ContextProps) => {
    const [loadingIsAllowed, setLoadingIsAllowed] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [savedID, setSavedID] = useLocalStorage("ID", null);

    const fetchAllUsers = useApi(usersApi.fetchAllUsers);

    useEffect(() => {
        if (savedID) {
            if (savedID !== 1) {
                //админа сохранять нельзя для безопасности
                if (!fetchAllUsers.data && !fetchAllUsers.loading) {
                    fetchAllUsers.request()
                }
            }
        }
    }, [savedID, fetchAllUsers]);

    useEffect(() => {
        if (fetchAllUsers.data) {
            const allUsers: User[] = fetchAllUsers.data;
            let userIsExist = false;
            allUsers.every((user: User) => {
                if (user.id === savedID) {
                    userIsExist = true;
                    setUser(user);
                    setLoadingIsAllowed(true);
                    return false;
                }
                return true;
            });
            if (!userIsExist) setSavedID(null);
        } else {
            setLoadingIsAllowed(true);
        }
    }, [fetchAllUsers.data, savedID, setSavedID]);

    const logIn = (loggedUser: User) => {
        setUser(loggedUser);
        setSavedID(loggedUser.id);
    };

    const logOut = () => {
        setUser(null);
        setSavedID(null);
    };

    const value: IUserContext = {
        loadingIsAllowed,
        user,
        logIn,
        logOut,
    };

    return (
        <userContext.Provider value={value}>{props.children}</userContext.Provider>
    );
};

export default UserContext;
