import React, {useContext, useState} from "react";
import {userContext} from "../../Context/UserContext";
import {modalContext} from "../../Context/ModalContext";
import {siteContext} from "../../Context/SiteContext";
import {ICategory} from "../../types/ICategory";
import {ITag} from "../../types/ITag";
import StylizedTextarea from "../common/StylizedTextarea";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import StylizedLinkButton from "../common/StylizedLinkButton";
import {apiContext} from "../../Context/ApiContext";

const SettingsMain = () => {
    const user = useContext(userContext).user;
    const siteCategoryList = useContext(siteContext).siteCategoryList;
    const siteTagList = useContext(siteContext).siteTagList;
    const logIn = useContext(userContext).logIn;
    const hideModal = useContext(modalContext).hideModal;
    const openSettingsNameModal = useContext(modalContext).openSettingsNameModal;
    const openSettingsPasswordModal = useContext(modalContext).openSettingsPasswordModal;
    const changeUser = useContext(apiContext).changeUser

    const [ignoredCategories, setIgnoredCategories] = useState(user?.ignoredCategories.map((ignoredCategory: number) =>
        siteCategoryList?.find((category: ICategory) => category.id === ignoredCategory).name))
    const [ignoredTags, setIgnoredTags] = useState(user?.ignoredTags.map((ignoredTag: number) =>
        siteTagList?.find((tag: ITag) => tag.id === ignoredTag).name))
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
            const tagsNameList: string[] = ignoredTags.filter((ignoredTag: string) => {
                let tagIsValid = false
                siteTagList?.every((tag: ITag) => {
                    if (tag.name.toLowerCase().trim() === ignoredTag.toLowerCase().trim()) {
                        tagIsValid = true
                        return false
                    }
                    return true
                })
                return tagIsValid
            })
            const changedUser = {
                ...user,
                ignoredCategories: categoriesNameList.map((ignoredCategory: string) =>
                    siteCategoryList?.find((category: ICategory) =>
                        category.name.toLowerCase().trim() === ignoredCategory.toLowerCase().trim()).id),
                ignoredTags: tagsNameList.map((ignoredTag: string) =>
                    siteTagList?.find((tag: ITag) =>
                        tag.name.toLowerCase().trim() === ignoredTag.toLowerCase().trim()).id)
            }
            await changeUser(user.id, changedUser)
            logIn(changedUser)
            hideModal()
            setLoading(false)
        };
        fetchData();
    };

    return (
        <>
            <ModalTitle>Ignoring settings</ModalTitle>
            <form onSubmit={handleSubmit}>
                <StylizedTextarea
                    name={"Ignored categories"}
                    value={ignoredCategories}
                    rows={3}
                    onChange={(event) => {
                        setIgnoredCategories(event.target.value.split(","))
                    }}/>
                <StylizedTextarea
                    name={"Ignored tags"}
                    value={ignoredTags}
                    rows={3}
                    onChange={(event) => {
                        setIgnoredTags(event.target.value.split(","))
                    }}/>
                <StylizedSubmitButton
                    name={"Save"}
                    loading={loading}
                    disabled={loading}/>
            </form>
            <StylizedLinkButton name={"Change Name"} onClick={openSettingsNameModal}/>
            <StylizedLinkButton name={"Change Password"} onClick={openSettingsPasswordModal}/>
        </>
    )
}

export default SettingsMain