import React, {useContext, useRef, useState} from "react";
import {IUser} from "../../types/IUser";
import {modalContext} from "../../Context/ModalContext";
import StyliZedInput from "../common/StylizedInput";
import InputError from "../common/InputError";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import {apiContext} from "../../Context/ApiContext";

interface IUserProps {
    setUser: Function
}

const Recovery = (props: IUserProps) => {
    const EMAIL_ERROR = "There is no user with this email"

    const setRecoveryUser = props.setUser

    const emailInputDOM = useRef<HTMLInputElement>(null)

    const fetchAllUsers = useContext(apiContext).fetchAllUsers;
    const openNewPasswordModal = useContext(modalContext).openNewPasswordModal;

    const [emailInputValue, setEmailInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailInputValue(emailInputValue.toLowerCase())

        const fetchData = async () => {
            setLoading(true)
            const allUsers = await fetchAllUsers()
            let userExist = false
            allUsers.every((user: IUser) => {
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
        }
        fetchData()
    }

    return (
        <>
            <ModalTitle>Password recovery</ModalTitle>
            <form onSubmit={handleSubmit}>
                <StyliZedInput
                    name={"Email *"}
                    type={"email"}
                    value={emailInputValue}
                    required={true}
                    error={!!errorMessage}
                    innerRef={emailInputDOM}
                    onChange={(event) => {
                        setEmailInputValue(event.target.value)
                    }}/>
                {errorMessage && <InputError>{errorMessage}</InputError>}
                <StylizedSubmitButton
                    name={"Send an email"}
                    loading={loading}
                    disabled={!emailInputValue || loading}/>
            </form>
        </>
    )
}

export default Recovery