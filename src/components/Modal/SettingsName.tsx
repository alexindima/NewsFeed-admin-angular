import React, {useContext, useRef, useState} from "react";
import {userContext} from "../../Context/UserContext";
import {validUserName} from "../../Regex/Regex"
import {modalContext} from "../../Context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import {apiContext} from "../../Context/ApiContext";

const SettingsName = () => {
    const NAME_ERROR = "The user name must contain at least 3 letters, numbers and underscores"

    const user = useContext(userContext).user
    const logIn = useContext(userContext).logIn
    const hideModal = useContext(modalContext).hideModal
    const changeUser = useContext(apiContext).changeUser

    const [nameInputValue, setNameInputValue] = useState(user.name)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const nameInputDOM = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validUserName.test(nameInputValue)) {
            setErrorMessage(NAME_ERROR);
            nameInputDOM.current!.focus();
        } else {
            const fetchData = async () => {
                setLoading(true)
                const changedUser = {...user, name: nameInputValue}
                await changeUser(user.id, changedUser)
                logIn(changedUser)
                hideModal()
                setLoading(false)
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
                        setNameInputValue(event.target.value)
                    }}/>
                {errorMessage && <InputError>{errorMessage}</InputError>}
                <StylizedSubmitButton
                    name={"Save new name"}
                    loading={loading}
                    disabled={!nameInputValue || loading}/>
            </form>
        </>
    )
}

export default SettingsName