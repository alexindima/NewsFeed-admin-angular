import React, {useContext, useRef, useState} from "react";
import "./Signup.scss"
import axios from "axios";
import {IUser} from "../../types/IUser";
import { calculateHash } from "../../encrypt/Hash"
import { validUserName, validPassword } from "../../Regex/Regex"
import { userContext } from "../../Context/UserContext";
import classNames from "classnames";
import {modalContext} from "../../Context/ModalContext";

// Нужен рефакторинг классов
const Signup = () => {
    const NAME_ERROR        = "The user name must contain at least 3 letters, numbers and underscores"
    const EMAIL_ERROR       = "This email is already exist"
    const PASSWORD_ERROR    = "The password must contain at least 6 valid characters"
    const PASSWORD2_ERROR   = "Passwords must match"

    const logIn     = useContext(userContext).logIn;
    const hideModal =  useContext(modalContext).hideModal;

    const nameInputDOM      = useRef<HTMLInputElement>(null)
    const emailInputDOM     = useRef<HTMLInputElement>(null)
    const passwordInputDOM  = useRef<HTMLInputElement>(null)

    const [nameInputValue, setNameInputValue]           = useState('')
    const [emailInputValue, setEmailInputValue]         = useState('')
    const [passwordInputValue, setPasswordInputValue]   = useState('')
    const [password2InputValue, setPassword2InputValue] = useState('')
    const [errorMessage, setErrorMessage]               = useState('')



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailInputValue(emailInputValue.toLowerCase())
        if (passwordInputValue !== password2InputValue) {
            setErrorMessage(PASSWORD2_ERROR);
            setPasswordInputValue("")
            setPassword2InputValue("")
            passwordInputDOM.current!.focus();
        }
        else if (!validUserName.test(nameInputValue)) {
            setErrorMessage(NAME_ERROR);
            setPasswordInputValue("")
            setPassword2InputValue("")
            nameInputDOM.current!.focus();
        }
        else if (!validPassword.test(passwordInputValue)) {
            setErrorMessage(PASSWORD_ERROR);
            setPasswordInputValue("")
            setPassword2InputValue("")
            passwordInputDOM.current!.focus();
        }
        else {
            const fetchData = async () => {
                const result = await axios(
                    'http://localhost:3030/users',
                );
                /*  Это должен делать бэк
                 */
                let userAlreadyExist = false
                let lastID = 0
                result.data.every((user:IUser) => {
                    if (user.id > lastID) {
                        lastID = user.id
                    }
                    if (user.email === emailInputValue.trim().toLowerCase()) {
                        userAlreadyExist = true
                        setErrorMessage(EMAIL_ERROR)
                        setPasswordInputValue("")
                        setPassword2InputValue("")
                        emailInputDOM.current!.focus();
                        return false
                    }
                    return true
                })
                if (!userAlreadyExist) {
                    const newUser = {
                        id: lastID + 1,
                        name: nameInputValue,
                        email: emailInputValue,
                        password: await calculateHash(passwordInputValue),
                        ignoredCategories: [""],
                        ignoredTags: [""]
                    }
                    const response = await axios.post('http://localhost:3030/users', newUser);
                    logIn(newUser)
                    hideModal()
                }
            };
            fetchData();
        }
    };

    const nameFieldClass = classNames({
        "form-field": true,
        "form-field--error": errorMessage === NAME_ERROR,
    })
    const emailFieldClass = classNames({
        "form-field": true,
        "form-field--error": errorMessage === EMAIL_ERROR,
    })
    const passwordFieldClass = classNames({
        "form-field": true,
        "form-field--error": (errorMessage === PASSWORD_ERROR) || (errorMessage === PASSWORD2_ERROR),
    })
    return (
        <div>
            <div className="modal-window__main-title">
                Sign Up
            </div>
            <form onSubmit={handleSubmit} className="modal-window__auth-form auth-form">
                <label className={nameFieldClass}>
                    <span className="form-field__title">Name *</span>
                    <input ref={nameInputDOM} type="text" className="form-field__input" required value={nameInputValue} onChange={(event) => {
                        setNameInputValue(event.target.value)
                    }} />
                </label>
                <label className={emailFieldClass}>
                    <span className="form-field__title">Email *</span>
                    <input ref={emailInputDOM} type="email" className="form-field__input" required value={emailInputValue} onChange={(event) => {
                        setEmailInputValue(event.target.value)
                    }} />
                </label>
                <label className={passwordFieldClass}>
                    <span className="form-field__title">Password *</span>
                    <input ref={passwordInputDOM} type="password" className="form-field__input" required value={passwordInputValue} onChange={(event) => {
                        setPasswordInputValue(event.target.value)
                    }} />
                </label>
                <label className={passwordFieldClass}>
                    <span className="form-field__title">Repeat the Password *</span>
                    <input type="password" className="form-field__input" value={password2InputValue} onChange={(event) => {
                        setPassword2InputValue(event.target.value)
                    }} />
                </label>
                {errorMessage && <div className="modal-window__error">{errorMessage}</div>}
                <button type="submit" className="auth-form__submit-button">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup