import React, {useContext, useRef, useState} from "react";
import styles from "./Login.module.scss";
import {calculateHash} from "../../../lib/Hash";
import {userContext} from "../../context/UserContext";
import {User} from "../../../types/User";
import {modalContext} from "../../context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import StylizedLinkButton from "../common/StylizedLinkButton";
import {apiContext} from "../../context/ApiContext";
import Signup from "./Signup";
import Recovery from "./Recovery";

const Login = () => {
    const EMAIL_ERROR = "There is no user with this email";
    const PASSWORD_ERROR = "Wrong password";

    const logIn = useContext(userContext).logIn;
    const setCurrentModal = useContext(modalContext).setCurrentModal;
    const openSignupModal = () => {
        setCurrentModal(<Signup/>);
    };
    const openRecoveryModal = () => {
        setCurrentModal(<Recovery/>);
    };
    const hideModal = () => {
        setCurrentModal(null);
    };
    const fetchAllUsers = useContext(apiContext).fetchAllUsers;

    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const emailInputDOM = useRef<HTMLInputElement>(null);
    const passwordInputDOM = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            setLoading(true);
            const allUsers = await fetchAllUsers();
            let emailIsExist = false;
            const passwordHash = await calculateHash(passwordInputValue);
            allUsers.every((user: User) => {
                if (user.email === emailInputValue.trim().toLowerCase()) {
                    emailIsExist = true;
                    if (user.password === passwordHash) {
                        //need convert to hash
                        logIn(user);
                        hideModal();
                        setLoading(false);
                        return false;
                    } else {
                        setErrorMessage(PASSWORD_ERROR);
                        setLoading(false);
                        setPasswordInputValue("");
                        passwordInputDOM.current!.focus();
                    }
                }
                return true;
            });
            if (!emailIsExist) {
                setErrorMessage(EMAIL_ERROR);
                setLoading(false);
                setPasswordInputValue("");
                emailInputDOM.current!.focus();
            }
        };
        fetchData();
    };

    return (
        <>
            <ModalTitle>Login to the site</ModalTitle>
            <form onSubmit={handleSubmit}>
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
                    error={errorMessage === PASSWORD_ERROR}
                    innerRef={passwordInputDOM}
                    onChange={(event) => {
                        setPasswordInputValue(event.target.value);
                    }}
                />
                {errorMessage && <InputError>{errorMessage}</InputError>}
                <StylizedSubmitButton
                    name={"Log In"}
                    loading={loading}
                    disabled={!emailInputValue || !passwordInputValue || loading}
                />
            </form>
            <StylizedLinkButton
                name={"Recover Password"}
                onClick={openRecoveryModal}
            />
            <ModalTitle>Or</ModalTitle>
            <button onClick={openSignupModal} className={styles.signUpButton}>
                Sign Up
            </button>
        </>
    );
};

export default Login;
