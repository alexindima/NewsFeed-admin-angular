import * as React from "react";
import {createContext, useState} from "react";
import {ContextProps} from "../../types/ContextProps";

interface IModalContext {
    currentModal: JSX.Element | null;
    setCurrentModal: Function;
}

export const modalContext = createContext<IModalContext>({
    currentModal: null,
    setCurrentModal: () => {
    },
});

const ModalContext = (props: ContextProps) => {
    const [currentModal, setCurrentModal] = useState<JSX.Element | null>(null);

    const value: IModalContext = {
        currentModal,
        setCurrentModal,
    };

    return (
        <modalContext.Provider value={value}>{props.children}</modalContext.Provider>
    );
};

export default ModalContext;
