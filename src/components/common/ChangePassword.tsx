import React, {useContext, useRef, useState} from "react";
import axios from "axios";
import {calculateHash} from "../../encrypt/Hash"
import {validPassword} from "../../Regex/Regex"
import {userContext} from "../../Context/UserContext";
import {modalContext} from "../../Context/ModalContext";
import StyliZedInput from "./StylizedInput";
import StylizedSubmitButton from "./StylizedSubmitButton";
import InputError from "./InputError";

interface IChangePasswordProps {
    userID: number
}

const ChangePassword = (props: IChangePasswordProps) => {
    const PASSWORD_ERROR = "The password must contain at least 6 valid characters"
    const PASSWORD2_ERROR = "Passwords must match"

    const passwordInputDOM = useRef<HTMLInputElement>(null)

    const recoveredUser = props.userID

    const logIn = useContext(userContext).logIn;
    const hideModal = useContext(modalContext).hideModal;

    const [passwordInputValue, setPasswordInputValue] = useState('')
    const [password2InputValue, setPassword2InputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (passwordInputValue !== password2InputValue) {
            setErrorMessage(PASSWORD2_ERROR)
            setPasswordInputValue("")
            setPassword2InputValue("")
            passwordInputDOM.current!.focus();
        } else if (!validPassword.test(passwordInputValue)) {
            setErrorMessage(PASSWORD_ERROR)
            setPasswordInputValue("")
            setPassword2InputValue("")
            passwordInputDOM.current!.focus();
        } else {
            const fetchData = async () => {
                setLoading(true)
                const result = await axios(`http://localhost:3030/users/${recoveredUser}`)
                const user = {...result.data, password: await calculateHash(passwordInputValue)}
                await axios.put(`http://localhost:3030/users/${recoveredUser}`, user)
                setLoading(false)
                logIn(user)
                hideModal()
            };
            fetchData();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <StyliZedInput
                name={"New Password *"}
                type={"password"}
                value={passwordInputValue}
                required={true}
                error={!!errorMessage}
                innerRef={passwordInputDOM}
                onChange={(event) => {
                    setPasswordInputValue(event.target.value)
                }}/>
            <StyliZedInput
                name={"Repeat New Password *"}
                type={"password"}
                value={password2InputValue}
                required={false}
                error={!!errorMessage}
                innerRef={undefined}
                onChange={(event) => {
                    setPassword2InputValue(event.target.value)
                }}/>
            {errorMessage && <InputError>{errorMessage}</InputError>}
            <StylizedSubmitButton
                name={"Save new password"}
                loading={loading}
                disabled={!passwordInputValue || !password2InputValue || loading}/>
        </form>
    )
}

export default ChangePassword