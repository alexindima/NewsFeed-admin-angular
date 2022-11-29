import React, {useContext, useState} from "react";
import "./Modal__SettingsMain.scss"
import axios from "axios";
import { calculateHash } from "../../encrypt/Hash"
import { UserContext } from "../../Context/Context";

// Нужен рефакторинг классов
const Modal__SettingsMain = () => {

    const user = useContext(UserContext).user;
    const logIn = useContext(UserContext).logIn;
    const hideModal = useContext(UserContext).hideModal;
    const openSettingsNameModal = useContext(UserContext).openSettingsNameModal;
    const openSettingsPasswordModal = useContext(UserContext).openSettingsPasswordModal;

    const [ignoredCategories, setIgnoredCategories] = useState(user.current.ignoredCategories)
    const [ignoredTags, setIgnoredTags] = useState(user.current.ignoredTags)


    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            const result = await axios(`http://localhost:3030/users/${user.current.id}`)
            const changedUser = {
                ...result.data,
                ignoredCategories: ignoredCategories.map((el) => el.trim()),
                ignoredTags: ignoredTags.map((el) => el.trim())
            }
            const response = await axios.put(`http://localhost:3030/users/${user.current.id}`, changedUser)
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