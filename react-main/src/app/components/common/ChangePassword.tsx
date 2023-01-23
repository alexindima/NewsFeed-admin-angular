import React, {useContext, useEffect, useRef, useState} from "react";
import {calculateHash} from "../../../lib/Hash";
import {validPassword} from "../../../lib/ValidRules";
import {userContext} from "../../context/UserContext";
import {modalContext} from "../../context/ModalContext";
import StyliZedInput from "./StylizedInput";
import StylizedSubmitButton from "./StylizedSubmitButton";
import InputError from "./InputError";
import useApi from "../../../hooks/useApi";
import userApi from "../../../api/users"
import {User} from "../../../types/User";

interface IChangePasswordProps {
    userID: number;
}

const ChangePassword = (props: IChangePasswordProps) => {
    const PASSWORD_ERROR =
        "The password must contain at least 6 valid characters";
    const PASSWORD2_ERROR = "Passwords must match";

    const passwordInputDOM = useRef<HTMLInputElement>(null);
    const wasSubmitted = useRef(false);

    const recoveredUser = props.userID;

    const logIn = useContext(userContext).logIn;
    const setCurrentModal = useContext(modalContext).setCurrentModal;
    const fetchUser = useApi(userApi.fetchUser);
    const changeUser = useApi(userApi.changeUser);

    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [password2InputValue, setPassword2InputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (passwordInputValue !== password2InputValue) {
            setErrorMessage(PASSWORD2_ERROR);
            setPasswordInputValue("");
            setPassword2InputValue("");
            passwordInputDOM.current!.focus();
        } else if (!validPassword.test(passwordInputValue)) {
            setErrorMessage(PASSWORD_ERROR);
            setPasswordInputValue("");
            setPassword2InputValue("");
            passwordInputDOM.current!.focus();
        } else {
            wasSubmitted.current = true
            fetchUser.request(recoveredUser)
            setLoading(true);
        }
    }

    useEffect(() => {
        const putNewPassword = async () => {
            const user: User = fetchUser.data!;
            const changedUser = {
                ...user,
                password: await calculateHash(passwordInputValue),
            };
            changeUser.request(recoveredUser, changedUser);
            setLoading(false);
            logIn(user);
            setCurrentModal(null);
        };
        if (fetchUser.data && wasSubmitted.current) {
            wasSubmitted.current = false
            putNewPassword()
        }
    }, [fetchUser.data, changeUser, setCurrentModal, logIn, passwordInputValue, recoveredUser])

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
                    setPasswordInputValue(event.target.value);
                }}
            />
            <StyliZedInput
                name={"Repeat New Password *"}
                type={"password"}
                value={password2InputValue}
                required={false}
                error={!!errorMessage}
                innerRef={undefined}
                onChange={(event) => {
                    setPassword2InputValue(event.target.value);
                }}
            />
            {errorMessage && <InputError>{errorMessage}</InputError>}
            <StylizedSubmitButton
                name={"Save new password"}
                loading={loading}
                disabled={!passwordInputValue || !password2InputValue || loading}
            />
        </form>
    );
};

export default ChangePassword;
