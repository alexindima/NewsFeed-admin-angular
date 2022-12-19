import React, {useContext, useRef, useState} from "react";
import {User} from "../../../types/User";
import {modalContext} from "../../context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import {apiContext} from "../../context/ApiContext";
import NewPassword from "./NewPassword";

const Recovery = () => {
    const EMAIL_ERROR = "There is no user with this email";

    const emailInputDOM = useRef<HTMLInputElement>(null);

    const fetchAllUsers = useContext(apiContext).fetchAllUsers;
    const setCurrentModal = useContext(modalContext).setCurrentModal;
    const openNewPasswordModal = (userId: number) => {
        setCurrentModal(<NewPassword userID={userId}/>);
    };

    const [emailInputValue, setEmailInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailInputValue(emailInputValue.toLowerCase());

        const fetchData = async () => {
            setLoading(true);
            const allUsers = await fetchAllUsers();
            let userExist = false;
            allUsers.every((user: User) => {
                if (user.email === emailInputValue.trim().toLowerCase()) {
                    userExist = true;
                    setLoading(false);
                    openNewPasswordModal(user.id);
                    return false;
                }
                return true;
            });
            if (!userExist) {
                setErrorMessage(EMAIL_ERROR);
                setLoading(false);
                emailInputDOM.current!.focus();
            }
        };
        fetchData();
    };

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
