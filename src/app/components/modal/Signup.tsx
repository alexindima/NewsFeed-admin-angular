import React, {useContext, useEffect, useRef, useState} from "react";
import {User} from "../../../types/User";
import {calculateHash} from "../../../lib/Hash";
import {validUserName, validPassword} from "../../../lib/ValidRules";
import {userContext} from "../../context/UserContext";
import {modalContext} from "../../context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import useApi from "../../../hooks/useApi";
import userApi from "../../../api/users"

const Signup = () => {
    const NAME_ERROR =
        "The user name must contain at least 3 letters, numbers and underscores";
    const EMAIL_ERROR = "This email is already exist";
    const PASSWORD_ERROR =
        "The password must contain at least 6 valid characters";
    const PASSWORD2_ERROR = "Passwords must match";

    const logIn = useContext(userContext).logIn;
    const setCurrentModal = useContext(modalContext).setCurrentModal;
    const hideModal = () => {
        setCurrentModal(null);
    };
    const fetchAllUsers = useApi(userApi.fetchAllUsers);
    const createUser = useApi(userApi.createUser)

    const nameInputDOM = useRef<HTMLInputElement>(null);
    const emailInputDOM = useRef<HTMLInputElement>(null);
    const passwordInputDOM = useRef<HTMLInputElement>(null);
    const wasSubmitted = useRef(false);

    const [nameInputValue, setNameInputValue] = useState("");
    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [password2InputValue, setPassword2InputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailInputValue(emailInputValue.toLowerCase());
        if (passwordInputValue !== password2InputValue) {
            setErrorMessage(PASSWORD2_ERROR);
            setPasswordInputValue("");
            setPassword2InputValue("");
            passwordInputDOM.current!.focus();
        } else if (!validUserName.test(nameInputValue)) {
            setErrorMessage(NAME_ERROR);
            setPasswordInputValue("");
            setPassword2InputValue("");
            nameInputDOM.current!.focus();
        } else if (!validPassword.test(passwordInputValue)) {
            setErrorMessage(PASSWORD_ERROR);
            setPasswordInputValue("");
            setPassword2InputValue("");
            passwordInputDOM.current!.focus();
        } else {
            setLoading(true);
            fetchAllUsers.request()
            wasSubmitted.current = true
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const allUsers: User[] = fetchAllUsers.data!;
            wasSubmitted.current = false;
            let userAlreadyExist = false;
            let lastID = 0;
            allUsers?.every((user: User) => {
                if (user.id > lastID) {
                    lastID = user.id;
                }
                if (user.email === emailInputValue.trim().toLowerCase()) {
                    userAlreadyExist = true;
                    setErrorMessage(EMAIL_ERROR);
                    setPasswordInputValue("");
                    setPassword2InputValue("");
                    setLoading(false);
                    emailInputDOM.current!.focus();
                    return false;
                }
                return true;
            });
            if (!userAlreadyExist) {
                const newUser = {
                    id: lastID + 1,
                    name: nameInputValue,
                    email: emailInputValue,
                    password: await calculateHash(passwordInputValue),
                    ignoredCategories: [],
                    ignoredTags: [],
                };
                createUser.request(newUser);
                logIn(newUser);
                hideModal();
                setLoading(false);
            }
        };
        if (wasSubmitted.current && fetchAllUsers.data) {
            fetchData();
        }
    }, [fetchAllUsers.data])

    return (
        <>
            <ModalTitle>Sign Up</ModalTitle>
            <form onSubmit={handleSubmit}>
                <StyliZedInput
                    name={"Name *"}
                    type={"text"}
                    value={nameInputValue}
                    required={true}
                    error={errorMessage === NAME_ERROR}
                    innerRef={nameInputDOM}
                    onChange={(event) => {
                        setNameInputValue(event.target.value);
                    }}
                />
                <StyliZedInput
                    name={"Email *"}
                    type={"email"}
                    value={emailInputValue}
                    required={true}
                    error={errorMessage === EMAIL_ERROR}
                    innerRef={emailInputDOM}
                    onChange={(event) => {
                        setEmailInputValue(event.target.value);
                    }}
                />
                <StyliZedInput
                    name={"Password *"}
                    type={"password"}
                    value={passwordInputValue}
                    required={true}
                    error={
                        errorMessage === PASSWORD_ERROR || errorMessage === PASSWORD2_ERROR
                    }
                    innerRef={passwordInputDOM}
                    onChange={(event) => {
                        setPasswordInputValue(event.target.value);
                    }}
                />
                <StyliZedInput
                    name={"Repeat the Password *"}
                    type={"password"}
                    value={password2InputValue}
                    required={false}
                    error={
                        errorMessage === PASSWORD_ERROR || errorMessage === PASSWORD2_ERROR
                    }
                    innerRef={undefined}
                    onChange={(event) => {
                        setPassword2InputValue(event.target.value);
                    }}
                />
                {errorMessage && <InputError>{errorMessage}</InputError>}
                <StylizedSubmitButton
                    name={"Sign Up"}
                    loading={loading}
                    disabled={
                        !nameInputValue ||
                        !emailInputValue ||
                        !passwordInputValue ||
                        !password2InputValue ||
                        loading
                    }
                />
            </form>
        </>
    );
};

export default Signup;
