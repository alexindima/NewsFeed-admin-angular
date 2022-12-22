import React, {useContext, useEffect, useRef, useState} from "react";
import {User} from "../../../types/User";
import {modalContext} from "../../context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import NewPassword from "./NewPassword";
import useApi from "../../../hooks/useApi";
import usersApi from "../../../api/users"

const Recovery = () => {
    const EMAIL_ERROR = "There is no user with this email";

    const emailInputDOM = useRef<HTMLInputElement>(null);

    const fetchAllUsers = useApi(usersApi.fetchAllUsers);
    const setCurrentModal = useContext(modalContext).setCurrentModal;

    const [emailInputValue, setEmailInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const wasSubmitted = useRef(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailInputValue(emailInputValue.toLowerCase());
        setLoading(true);
        fetchAllUsers.request()
        wasSubmitted.current = true
    };

    useEffect(() => {
        if (wasSubmitted && fetchAllUsers.data) {
            wasSubmitted.current = false
            const allUsers: User[] = fetchAllUsers.data!
            let userExist = false;
            allUsers?.every((user: User) => {
                if (user.email === emailInputValue.trim().toLowerCase()) {
                    userExist = true;
                    setLoading(false);
                    setCurrentModal(<NewPassword userID={user.id}/>);
                    return false;
                }
                return true;
            });
            if (!userExist) {
                setErrorMessage(EMAIL_ERROR);
                setLoading(false);
                emailInputDOM.current!.focus();
            }
        }
    }, [fetchAllUsers.data, emailInputValue, setCurrentModal])

    return (
        <>
            <ModalTitle>Password recovery</ModalTitle>
            <form onSubmit={handleSubmit}>
                <StyliZedInput
                    name={"Email *"}
                    type={"email"}
                    value={emailInputValue}
                    required={true}
                    error={!!errorMessage}
                    innerRef={emailInputDOM}
                    onChange={(event) => {
                        setEmailInputValue(event.target.value);
                    }}
                />
                {errorMessage && <InputError>{errorMessage}</InputError>}
                <StylizedSubmitButton
                    name={"Send an email"}
                    loading={loading}
                    disabled={!emailInputValue || loading}
                />
            </form>
        </>
    );
};

export default Recovery;
