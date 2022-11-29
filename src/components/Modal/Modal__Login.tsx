import React, {useContext, useRef, useState} from "react";
import "./Modal__Login.scss"
import axios from "axios";
import { calculateHash } from "../../encrypt/Hash"
import { UserContext } from "../../Context/Context";
import classNames from "classnames";
import {IUser} from "../../type/IUser";

const Modal__Login = () => {
    const EMAIL_ERROR = "There is no user with this email"
    const PASSWORD_ERROR = "Wrong password"

    const logIn = useContext(UserContext).logIn;
    const openSignupModal = useContext(UserContext).openSignupModal;
    const openRecoveryModal = useContext(UserContext).openRecoveryModal;

    const [emailInputValue, setEmailInputValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const emailInputDOM  = useRef<HTMLInputElement>(null)
    const passwordInputDOM  = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
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
                        return false
                    }
                    else {
                        setErrorMessage(PASSWORD_ERROR)
                        passwordInputDOM.current!.focus();
                    }
                }
                return true
            })
            if (!emailIsExist) {
                setErrorMessage(EMAIL_ERROR)
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
            <form onSubmit={handleSubmit} className="modal-window__auth-form auth-form">
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
                <button type="submit" className="auth-form__submit-button">Log In</button>
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

export default Modal__Login