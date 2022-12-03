import React, {useContext, useState} from "react";
import "./SettingsMain.scss"
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import {modalContext} from "../../Context/ModalContext";
import PulseLoader from "react-spinners/PulseLoader";

// Нужен рефакторинг классов
const SettingsMain = () => {
    const userID                    = useContext(userContext).userID;
    const userIgnoredCategories     = useContext(userContext).userIgnoredCategories;
    const userIgnoredTags           = useContext(userContext).userIgnoredTags;
    const logIn                     = useContext(userContext).logIn;
    const hideModal                 = useContext(modalContext).hideModal;
    const openSettingsNameModal     = useContext(modalContext).openSettingsNameModal;
    const openSettingsPasswordModal = useContext(modalContext).openSettingsPasswordModal;

    const [ignoredCategories, setIgnoredCategories] = useState(userIgnoredCategories)//useref instead states
    const [ignoredTags, setIgnoredTags]             = useState(userIgnoredTags)
    const [loading, setLoading]                     = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            setLoading(true)
            const result = await axios(`http://localhost:3030/users/${userID}`)
            const changedUser = {
                ...result.data,
                ignoredCategories: ignoredCategories.map((category:string) => category.trim()),
                ignoredTags: ignoredTags.map((tag:string) => tag.trim())
            }
            const response = await axios.put(`http://localhost:3030/users/${userID}`, changedUser)
            logIn(changedUser)
            hideModal()
            setLoading(false)
        };
        fetchData();
    };

    return (
        <div>
            <div className="modal-window__main-title">
                Ignoring settings
            </div>
            <form onSubmit={handleSubmit} className="modal-window__auth-form auth-form">
                <label className="auth-form__field form-field">
                    <span className="form-field__title">Ignored categories</span>
                    <textarea rows={3} className="form-field__textarea" value={ignoredCategories} onChange={(event) => {
                        setIgnoredCategories(event.target.value.split(","))
                    }} />
                </label>
                <label className="mainSettings__field form-field">
                    <span className="form-field__title">Ignored tags</span>
                    <textarea rows={3} className="form-field__textarea" value={ignoredTags} onChange={(event) => {
                        setIgnoredTags(event.target.value.split(","))
                    }} />
                </label>
                <button type="submit" className="mainSettings__submitButton">Save<div className="recoveryForm__spinner">
                    <PulseLoader
                        color="#ffffff"
                        loading={loading}
                        size={10}
                    />
                </div></button>
            </form>
            <div className="modal-window__recover-password change-name-password">
                <button onClick={openSettingsNameModal} className="change-name-password__button">Change Name</button>
            </div>
            <div className="modal-window__recover-password change-name-password">
                <button onClick={openSettingsPasswordModal} className="change-name-password__button">Change Password</button>
            </div>
        </div>
    )
}

export default SettingsMain