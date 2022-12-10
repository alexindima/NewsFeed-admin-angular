import React, {useContext, useState} from "react";
import "./SettingsMain.scss"
import axios from "axios";
import {userContext} from "../../Context/UserContext";
import {modalContext} from "../../Context/ModalContext";
import PulseLoader from "react-spinners/PulseLoader";
import {siteContext} from "../../Context/SiteContext";
import {ICategory} from "../../types/ICategory";

// Нужен рефакторинг классов
const SettingsMain = () => {
    const user = useContext(userContext).user;
    const siteCategoryList = useContext(siteContext).siteCategoryList;

    const logIn = useContext(userContext).logIn;
    const hideModal = useContext(modalContext).hideModal;
    const openSettingsNameModal = useContext(modalContext).openSettingsNameModal;
    const openSettingsPasswordModal = useContext(modalContext).openSettingsPasswordModal;
    const [ignoredCategories, setIgnoredCategories] = useState(user?.ignoredCategories.map((ignoredCategory: number) =>
        siteCategoryList?.find((category: ICategory) => category.id === ignoredCategory).name))
    const [ignoredTags, setIgnoredTags] = useState(user?.ignoredTags)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            setLoading(true)
            const categoriesNameList: string[] = ignoredCategories.filter((ignoredCategory: string) => {
                let categoryIsValid = false
                siteCategoryList?.every((category: ICategory) => {
                    if (category.name.toLowerCase().trim() === ignoredCategory.toLowerCase().trim()) {
                        categoryIsValid = true
                        return false
                    }
                    return true
                })
                return categoryIsValid
            })
            const result = await axios(`http://localhost:3030/users/${user.id}`)
            const changedUser = {
                ...result.data,
                ignoredCategories: categoriesNameList.map((ignoredCategory: string) =>
                    siteCategoryList?.find((category: ICategory) =>
                        category.name.toLowerCase().trim() === ignoredCategory.toLowerCase().trim()).id),
                ignoredTags: ignoredTags.map((tag: string) => tag.trim())
            }
            await axios.put(`http://localhost:3030/users/${user.id}`, changedUser)
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
                    }}/>
                </label>
                <label className="mainSettings__field form-field">
                    <span className="form-field__title">Ignored tags</span>
                    <textarea rows={3} className="form-field__textarea" value={ignoredTags} onChange={(event) => {
                        setIgnoredTags(event.target.value.split(","))
                    }}/>
                </label>
                <button type="submit" className="mainSettings__submitButton"
                        disabled={(
                            loading
                        )}>
                    Save
                    <div className="recoveryForm__spinner">
                        <PulseLoader
                            color="#ffffff"
                            loading={loading}
                            size={10}
                        />
                    </div>
                </button>
            </form>
            <div className="modal-window__recover-password change-name-password">
                <button onClick={openSettingsNameModal} className="change-name-password__button">Change Name</button>
            </div>
            <div className="modal-window__recover-password change-name-password">
                <button onClick={openSettingsPasswordModal} className="change-name-password__button">Change Password
                </button>
            </div>
        </div>
    )
}

export default SettingsMain