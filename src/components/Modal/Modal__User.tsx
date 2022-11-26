import React, {useContext, useState} from "react";
import "./Modal__User.scss"
import axios from "axios";
import { UserContext } from "../../Context/Context";

// Нужен рефакторинг классов
const Modal__User = () => {
    const EMAIL_ERROR = "This email is not exist"
    const PASSWORD_ERROR = "Wrong password"

    const logIn = useContext(UserContext).logIn;

    const [emailInputValue, setEmailInputValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3030/users',
            );

            /*  Это должен делать бэк
             */
            let emailIsExist = false
            const resultData = result.data
            result.data.every(el => {
                if (el.email === emailInputValue.trim().toLowerCase()) {
                    emailIsExist = true
                    if (el.password === passwordInputValue) {//need convert to hash
                        logIn(el)
                        return false
                    }
                    else {
                        setErrorMessage(PASSWORD_ERROR)
                    }
                }
                return true
            })
            if (!emailIsExist) {setErrorMessage(EMAIL_ERROR)}
        };
        fetchData();

    };

    return (
        <div>
            <div className="modal-window__main-title">
                Login to the site
            </div>
            <form onSubmit={handleSubmit} className="modal-window__auth-form auth-form">
                <label className="auth-form__field form-field">
                    <span className="form-field__title">Email</span>
                    <input type="email" className="form-field__input" required value={emailInputValue} onChange={(event) => {
                        setEmailInputValue(event.target.value)
                    }} />
                </label>
                <label className="auth-form__field form-field">
                    <span className="form-field__title">Password</span>
                    <input type="password" className="form-field__input" required value={passwordInputValue} onChange={(event) => {
                        setPasswordInputValue(event.target.value)
                    }} />
                </label>
                <button type="submit" className="auth-form__submit-button">Log In</button>
            </form>
            <div className="modal-window__recover-password recover-password">
                <a href="#" className="recover-password__link">Recover Password</a>
            </div>
            <div className="modal-window__second-title">
                Or
            </div>
            <div className="modal-window__sign-up-button sign-up-button">
                <a href="#" className="sign-up-button__link">Sign Up</a>
            </div>
        </div>
    )
}

export default Modal__User