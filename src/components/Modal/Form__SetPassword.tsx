import React, {useContext, useRef, useState} from "react";
import "./Form__SetPassword.scss"
import axios from "axios";
import {calculateHash} from "../../encrypt/Hash"
import {validPassword} from "../../Regex/Regex"
import classNames from "classnames";
import {UserContext} from "../../Context/Context";

interface IUserIDProps {
    userID: number
}

const Modal__SetPassword = (props: IUserIDProps) => {
    const PASSWORD_ERROR = "The password must contain at least 6 valid characters"
    const PASSWORD2_ERROR = "Passwords must match"

    const passwordInputDOM  = useRef<HTMLInputElement>(null)
    const recoveredUser = props.userID

    const logIn = useContext(UserContext).logIn;
    const hideModal =  useContext(UserContext).hideModal;

    const [emailInputValue, setEmailInputValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')
    const [password2InputValue, setPassword2InputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setEmailInputValue(emailInputValue.toLowerCase())
        if (passwordInputValue !== password2InputValue) {
            setErrorMessage(PASSWORD2_ERROR)
            setPasswordInputValue("")
            setPassword2InputValue("")
            passwordInputDOM.current!.focus();
        }
        else if (!validPassword.test(passwordInputValue)) {
            setErrorMessage(PASSWORD_ERROR)
            setPasswordInputValue("")
            setPassword2InputValue("")
            passwordInputDOM.current!.focus();
        }
        else {
            const fetchData = async () => {
                const result = await axios(`http://localhost:3030/users/${recoveredUser}`)
                const user = {...result.data, password: await calculateHash(passwordInputValue)}
                const response = await axios.put(`http://localhost:3030/users/${recoveredUser}`, user)
                logIn(user)
                hideModal()
            };
            fetchData();
        }
    };

    const passwordFieldClass = classNames({
        "form-field": true,
        "form-field--error": !!errorMessage,
    })

    return (
        <form onSubmit={handleSubmit} className="modal-window__auth-form auth-form">
            <label className={passwordFieldClass}>
                <span className="form-field__title">New Password *</span>
                <input ref={passwordInputDOM} type="password" className="form-field__input" required value={passwordInputValue} onChange={(event) => {
                    setPasswordInputValue(event.target.value)
                }} />
            </label>
            <label className={passwordFieldClass}>
                <span className="form-field__title">Repeat New Password *</span>
                <input type="password" className="form-field__input" value={password2InputValue} onChange={(event) => {
                    setPassword2InputValue(event.target.value)
                }} />
            </label>
            {errorMessage && <div className="modal-window__error">{errorMessage}</div>}
            <button type="submit" className="auth-form__submit-button">Save new password</button>
        </form>
    )
}

export default Modal__SetPassword