import React, {useContext, useState} from "react";
import "./Modal__SettingsMain.scss"
import axios from "axios";
import { UserContext } from "../../Context/Context";

// Нужен рефакторинг классов
const Modal__SettingsMain = () => {
    const userID = useContext(UserContext).userID;
    const userIgnoredCategories = useContext(UserContext).userIgnoredCategories;
    const userIgnoredTags = useContext(UserContext).userIgnoredTags;
    const logIn = useContext(UserContext).logIn;
    const hideModal = useContext(UserContext).hideModal;
    const openSettingsNameModal = useContext(UserContext).openSettingsNameModal;
    const openSettingsPasswordModal = useContext(UserContext).openSettingsPasswordModal;

    const [ignoredCategories, setIgnoredCategories] = useState(userIgnoredCategories)//useref instead states
    const [ignoredTags, setIgnoredTags] = useState(userIgnoredTags)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            const result = await axios(`http://localhost:3030/users/${userID}`)
            const changedUser = {
                ...result.data,
                ignoredCategories: ignoredCategories.map((category:string) => category.trim()),
                ignoredTags: ignoredTags.map((tag:string) => tag.trim())
            }
            const response = await axios.put(`http://localhost:3030/users/${userID}`, changedUser)
            logIn(changedUser)
            hideModal()
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
                <label className="auth-form__field form-field">
                    <span className="form-field__title">Ignored tags</span>
                    <textarea rows={3} className="form-field__textarea" value={ignoredTags} onChange={(event) => {
                        setIgnoredTags(event.target.value.split(","))
                    }} />
                </label>
                <button type="submit" className="auth-form__submit-button">Save</button>
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

export default Modal__SettingsMain