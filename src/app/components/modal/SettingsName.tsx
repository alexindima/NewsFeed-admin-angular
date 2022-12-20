import React, {useContext, useRef, useState} from "react";
import {userContext} from "../../context/UserContext";
import {validUserName} from "../../../lib/ValidRules";
import {modalContext} from "../../context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import {apiContext} from "../../context/ApiContext";

const SettingsName = () => {
    const NAME_ERROR =
        "The user name must contain at least 3 letters, numbers and underscores";

    const user = useContext(userContext).user!; //this component exist only if user exist
    const logIn = useContext(userContext).logIn;
    const setCurrentModal = useContext(modalContext).setCurrentModal;
    const hideModal = () => {
        setCurrentModal(null);
    };
    const changeUser = useContext(apiContext).changeUser;

    const [nameInputValue, setNameInputValue] = useState(user.name);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const nameInputDOM = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validUserName.test(nameInputValue)) {
            setErrorMessage(NAME_ERROR);
            nameInputDOM.current!.focus();
        } else {
            const fetchData = async () => {
                setLoading(true);
                const changedUser = {...user, name: nameInputValue};
                await changeUser(user.id, changedUser);
                logIn(changedUser);
                hideModal();
                setLoading(false);
            };
            fetchData();
        }
    };

    return (
        <>
            <ModalTitle>Change name</ModalTitle>
            <form onSubmit={handleSubmit}>
                <StyliZedInput
                    name={"New name *"}
                    type={"text"}
                    value={nameInputValue}
                    required={true}
                    error={!!errorMessage}
                    innerRef={nameInputDOM}
                    onChange={(event) => {
                        setNameInputValue(event.target.value);
                    }}
                />
                {errorMessage && <InputError>{errorMessage}</InputError>}
                <StylizedSubmitButton
                    name={"Save new name"}
                    loading={loading}
                    disabled={!nameInputValue || loading}
                />
            </form>
        </>
    );
};

export default SettingsName;
