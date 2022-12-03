import React, {useContext, useRef, useState} from "react";
import "./Recovery.scss"
import {IUser} from "../../types/IUser";
import axios from "axios"
import classNames from "classnames";
import {modalContext} from "../../Context/ModalContext";
import PulseLoader from "react-spinners/PulseLoader";

interface IUserProps {
    setUser: Function
}

const Recovery = (props: IUserProps) => {
    const EMAIL_ERROR = "There is no user with this email"

    const setRecoveryUser = props.setUser

    const emailInputDOM  = useRef<HTMLInputElement>(null)

    const openNewPasswordModal =  useContext(modalContext).openNewPasswordModal;

    const [emailInputValue, setEmailInputValue] = useState('')
    const [errorMessage, setErrorMessage]       = useState('')
    const [loading, setLoading]                 = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailInputValue(emailInputValue.toLowerCase())

        const fetchData = async () => {
            setLoading(true)
            const result = await axios(
                'http://localhost:3030/users',
            );
            /*  Это должен делать бэк
             */
            let userExist = false
            result.data.every((user: IUser) => {
                if (user.email === emailInputValue.trim().toLowerCase()) {
                    userExist = true
                    setRecoveryUser(user.id)
                    setLoading(false)
                    openNewPasswordModal()
                    return false
                }
                return true
            })
            if (!userExist) {
                setErrorMessage(EMAIL_ERROR)
                setLoading(false)
                emailInputDOM.current!.focus();
            }
        };
        fetchData();

    };

    const emailFieldClass = classNames({
        "form-field": true,
        "form-field--error": !!errorMessage,
    })

    return (
        <div>
            <div className="modal-window__main-title">
                Password recovery
            </div>
            <form onSubmit={handleSubmit} className="modal-window__auth-form recoveryForm">
                <label className={emailFieldClass}>
                    <span className="form-field__title">Email *</span>
                    <input ref={emailInputDOM} type="email" className="form-field__input" required value={emailInputValue} onChange={(event) => {
                        setEmailInputValue(event.target.value)
                    }} />
                </label>
                {errorMessage && <div className="modal-window__error">{errorMessage}</div>}
                <button type="submit" className="recoveryForm__submitButton">Send an email<div className="recoveryForm__spinner">
                    <PulseLoader
                        color="#ffffff"
                        loading={loading}
                        size={10}
                    />
                </div></button>
            </form>
        </div>
    )
}

export default Recovery