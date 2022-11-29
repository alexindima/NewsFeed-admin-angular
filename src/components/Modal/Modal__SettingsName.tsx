import React, {useContext, useRef, useState} from "react";
import "./Modal__SettingsName.scss"
import axios from "axios";
import { UserContext } from "../../Context/Context";
import {validUserName} from "../../Regex/Regex";
import classNames from "classnames";

// Нужен рефакторинг классов
const Modal__SettingsName = () => {
    const NAME_ERROR = "The user name must contain at least 3 letters, numbers and underscores"

    const user = useContext(UserContext).user;
    const logIn = useContext(UserContext).logIn;
    const hideModal =  useContext(UserContext).hideModal;

    const [nameInputValue, setNameInputValue] = useState(user.current.name)
    const [errorMessage, setErrorMessage] = useState('')

    const changedUser = user.current.id
    const nameInputDOM  = useRef<HTMLInputElement>(null)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validUserName.test(nameInputValue)) {
            setErrorMessage(NAME_ERROR);
            nameInputDOM.current!.focus();
        }
        else {
            const fetchData = async () => {
                const result = await axios(`http://localhost:3030/users/${changedUser}`)
                const user = {...result.data, name: nameInputValue}
                const response = await axios.put(`http://localhost:3030/users/${changedUser}`, user)
                logIn(user)
                hideModal()
            };
            fetchData();
        }
    };

    const nameFieldClass = classNames({
        "form-field": true,
        "form-field--error": errorMessage === NAME_ERROR,
    })

    return (
        <div>
            <div className="modal-window__main-title">
                Change name
            </div>
            <form onSubmit={handleSubmit} className="modal-window__auth-form auth-form">
                <label className={nameFieldClass}>
                    <span className="form-field__title">New name *</span>
                    <input ref={nameInputDOM} type="text" className="form-field__input" required value={nameInputValue} onChange={(event) => {
                        setNameInputValue(event.target.value)
                    }} />
                </label>
                {errorMessage && <div className="modal-window__error">{errorMessage}</div>}
                <button type="submit" className="auth-form__submit-button">Save new name</button>
            </form>
        </div>
    )
}

export default Modal__SettingsName