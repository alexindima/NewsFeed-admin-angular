import * as React from "react";
import {createContext, MouseEventHandler, useContext, useEffect, useState} from "react";
import {User} from "../../types/User";
import {ContextProps} from "../../types/ContextProps";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {apiContext} from "./ApiContext";

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

    const fetchAllUsers = useContext(apiContext).fetchAllUsers;

    useEffect(() => {
        if (savedID) {
            if (savedID !== 1) {
                //админа сохранять нельзя для безопасности
                const fetchData = async () => {
                    const allUsers = await fetchAllUsers!();
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
                };
                fetchData();
            }
        } else {
            setLoadingIsAllowed(true);
        }
        // eslint-disable-next-line
    }, []);

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
