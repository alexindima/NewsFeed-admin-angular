import React, {useContext, useRef, useState} from "react";
import styles from "./Login.module.scss"
import axios from "axios";
import {calculateHash} from "../../encrypt/Hash"
import {userContext} from "../../Context/UserContext";
import {IUser} from "../../types/IUser";
import {modalContext} from "../../Context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import StylizedLinkButton from "../common/StylizedLinkButton";

const Login = () => {
    const EMAIL_ERROR = "There is no user with this email"
    const PASSWORD_ERROR = "Wrong password"

    const logIn = useContext(userContext).logIn;
    const openSignupModal = useContext(modalContext).openSignupModal;
    const openRecoveryModal = useContext(modalContext).openRecoveryModal;
    const hideModal = useContext(modalContext).hideModal;

    const [emailInputValue, setEmailInputValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const emailInputDOM = useRef<HTMLInputElement>(null)
    const passwordInputDOM = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            setLoading(true)
            const result = await axios(
                'http://localhost:3030/users',
            );

            /*  Это должен делать бэк
             */
            let emailIsExist = false
            const passwordHash = await calculateHash(passwordInputValue)
            result.data.every((user: IUser) => {
                if (user.email === emailInputValue.trim().toLowerCase()) {
                    emailIsExist = true
                    if (user.password === passwordHash) {//need convert to hash
                        logIn(user)
                        hideModal()
                        setLoading(false)
                        return false
                    } else {
                        setErrorMessage(PASSWORD_ERROR)
                        setLoading(false)
                        setPasswordInputValue("")
                        passwordInputDOM.current!.focus();
                    }
                }
                return true
            })
            if (!emailIsExist) {
                setErrorMessage(EMAIL_ERROR)
                setLoading(false)
                setPasswordInputValue("")
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
                        setEmailInputValue(event.target.value)
                    }}/>
                <StyliZedInput
                    name={"Password *"}
                    type={"password"}
                    value={passwordInputValue}
                    required={true}
                    error={errorMessage === PASSWORD_ERROR}
                    innerRef={passwordInputDOM}
                    onChange={(event) => {
                        setPasswordInputValue(event.target.value)
                    }}/>
                {errorMessage && <InputError>{errorMessage}</InputError>}
                <StylizedSubmitButton
                    name={"Log In"}
                    loading={loading}
                    disabled={!emailInputValue || !passwordInputValue || loading}/>
            </form>
            <StylizedLinkButton name={"Recover Password"} onClick={openRecoveryModal}/>
            <ModalTitle>Or</ModalTitle>
            <button onClick={openSignupModal} className={styles.signUpButton}>Sign Up</button>
        </>
    )
}

export default Login