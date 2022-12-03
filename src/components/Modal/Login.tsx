import React, {useContext, useRef, useState} from "react";
import "./Login.scss"
import axios from "axios";
import { calculateHash } from "../../encrypt/Hash"
import { userContext } from "../../Context/UserContext";
import classNames from "classnames";
import {IUser} from "../../types/IUser";
import {modalContext} from "../../Context/ModalContext";
import PulseLoader from "react-spinners/PulseLoader";

const Login = () => {
    const EMAIL_ERROR       = "There is no user with this email"
    const PASSWORD_ERROR    =  "Wrong password"

    const logIn             = useContext(userContext).logIn;
    const openSignupModal   = useContext(modalContext).openSignupModal;
    const openRecoveryModal = useContext(modalContext).openRecoveryModal;
    const hideModal         = useContext(modalContext).hideModal;

    const [emailInputValue, setEmailInputValue]         = useState('')
    const [passwordInputValue, setPasswordInputValue]   = useState('')
    const [errorMessage, setErrorMessage]               = useState('')
    const [loading, setLoading]                         = useState(false);

    const emailInputDOM     = useRef<HTMLInputElement>(null)
    const passwordInputDOM  = useRef<HTMLInputElement>(null)

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
                    }
                    else {
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

    const emailFieldClass = classNames({
        "form-field": true,
        "form-field--error": errorMessage === EMAIL_ERROR,
    })
    const passwordFieldClass = classNames({
        "form-field": true,
        "form-field--error": errorMessage === PASSWORD_ERROR,
    })

    return (
        <div>
            <div className="modal-window__main-title">
                Login to the site
            </div>
            <form onSubmit={handleSubmit} className="modal-window__auth-form loginForm">
                <label className={emailFieldClass}>
                    <span className="form-field__title">Email</span>
                    <input ref={emailInputDOM} type="email" className="form-field__input" required value={emailInputValue} onChange={(event) => {
                        setEmailInputValue(event.target.value)
                    }} />
                </label>
                <label className={passwordFieldClass}>
                    <span className="form-field__title">Password</span>
                    <input ref={passwordInputDOM} type="password" className="form-field__input" required value={passwordInputValue} onChange={(event) => {
                        setPasswordInputValue(event.target.value)
                    }} />
                </label>
                {errorMessage && <div className="modal-window__error">{errorMessage}</div>}
                <button type="submit" className="loginForm__submitButton">Log In<div className="recoveryForm__spinner">
                    <PulseLoader
                        color="#ffffff"
                        loading={loading}
                        size={10}
                    />
                </div></button>
            </form>
            <div className="modal-window__recover-password recover-password">
                <button onClick={openRecoveryModal} className="recover-password__button">Recover Password</button>
            </div>
            <div className="modal-window__second-title">
                Or
            </div>
            <button onClick={openSignupModal} className="auth-form__submit-button">Sign Up</button>
        </div>
    )
}

export default Login