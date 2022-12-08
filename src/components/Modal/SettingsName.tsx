import React, {useContext, useRef, useState} from "react";
import "./SettingsName.scss"
import axios from "axios";
import {userContext} from "../../Context/UserContext";
import {validUserName} from "../../Regex/Regex";
import classNames from "classnames";
import {modalContext} from "../../Context/ModalContext";
import PulseLoader from "react-spinners/PulseLoader";

// Нужен рефакторинг классов
const SettingsName = () => {
    const NAME_ERROR = "The user name must contain at least 3 letters, numbers and underscores"

    const user = useContext(userContext).user;
    const logIn = useContext(userContext).logIn;
    const hideModal = useContext(modalContext).hideModal;

    const [nameInputValue, setNameInputValue] = useState(user.name)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const nameInputDOM = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validUserName.test(nameInputValue)) {
            setErrorMessage(NAME_ERROR);
            nameInputDOM.current!.focus();
        } else {
            const fetchData = async () => {
                setLoading(true)
                const result = await axios(`http://localhost:3030/users/${user.id}`)
                const changedUser = {...result.data, name: nameInputValue}
                await axios.put(`http://localhost:3030/users/${user.id}`, changedUser)
                logIn(changedUser)
                hideModal()
                setLoading(false)
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
            <form onSubmit={handleSubmit} className="modal-window__auth-form nameForm">
                <label className={nameFieldClass}>
                    <span className="form-field__title">New name *</span>
                    <input ref={nameInputDOM} type="text" className="form-field__input" required value={nameInputValue}
                           onChange={(event) => {
                               setNameInputValue(event.target.value)
                           }}/>
                </label>
                {errorMessage && <div className="modal-window__error">{errorMessage}</div>}
                <button type="submit" className="nameForm__submitButton"
                        disabled={(
                            !nameInputValue ||
                            loading
                        )}>
                    Save new name
                    <div className="recoveryForm__spinner">
                        <PulseLoader
                            color="#ffffff"
                            loading={loading}
                            size={10}
                        />
                    </div>
                </button>
            </form>
        </div>
    )
}

export default SettingsName