import React, {useContext, useState} from "react";
import {userContext} from "../../context/UserContext";
import {modalContext} from "../../context/ModalContext";
import {siteContext} from "../../context/SiteContext";
import {Category} from "../../../types/Category";
import {ITag} from "../../../types/Tag";
import StylizedTextarea from "../common/StylizedTextarea";
import StylizedSubmitButton from "../common/StylizedSubmitButton";
import ModalTitle from "../common/ModalTitle";
import StylizedLinkButton from "../common/StylizedLinkButton";
import {apiContext} from "../../context/ApiContext";
import SettingsName from "./SettingsName";
import SettingsPassword from "./SettingsPassword";

const SettingsMain = () => {
    const user = useContext(userContext).user;
    const siteCategoryList = useContext(siteContext).siteCategoryList;
    const siteTagList = useContext(siteContext).siteTagList;
    const logIn = useContext(userContext).logIn;
    const setCurrentModal = useContext(modalContext).setCurrentModal;
    const hideModal = () => {
        setCurrentModal(null);
    };
    const openSettingsNameModal = () => {
        setCurrentModal(<SettingsName/>);
    };
    const openSettingsPasswordModal = () => {
        setCurrentModal(<SettingsPassword/>);
    };
    const changeUser = useContext(apiContext).changeUser;

    const [ignoredCategories, setIgnoredCategories] = useState(
        user?.ignoredCategories.map((ignoredCategory: number) => {
            let categoryName = ''
            siteCategoryList?.every((category: Category) => {
                if (category.id === ignoredCategory) {
                    categoryName = category.name
                    return false
                }
                return true
            })
            return categoryName
        }) || []
    );
    const [ignoredTags, setIgnoredTags] = useState(
        user?.ignoredTags.map((ignoredTag: number) => {
            let tagName = ''
            siteTagList?.every((tag: ITag) => {
                if (tag.id === ignoredTag) {
                    tagName = tag.name
                    return false
                }
                return true
            })
            return tagName
        }) || []
    );
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            setLoading(true);
            const categoriesNameList: string[] = ignoredCategories.filter(
                (ignoredCategory: string) => {
                    let categoryIsValid = false;
                    siteCategoryList?.every((category: Category) => {
                        if (
                            category.name.toLowerCase().trim() ===
                            ignoredCategory.toLowerCase().trim()
                        ) {
                            categoryIsValid = true;
                            return false;
                        }
                        return true;
                    });
                    return categoryIsValid;
                }
            );
            const tagsNameList: string[] = ignoredTags?.filter(
                (ignoredTag: string) => {
                    let tagIsValid = false;
                    siteTagList?.every((tag: ITag) => {
                        if (
                            tag.name.toLowerCase().trim() === ignoredTag.toLowerCase().trim()
                        ) {
                            tagIsValid = true;
                            return false;
                        }
                        return true;
                    });
                    return tagIsValid;
                }
            ) || [];
            const changedUser = {
                ...user,
                ignoredCategories: categoriesNameList.map(
                    (ignoredCategory: string) =>
                        siteCategoryList?.find(
                            (category: Category) =>
                                category.name.toLowerCase().trim() ===
                                ignoredCategory.toLowerCase().trim()
                        )?.id
                ),
                ignoredTags: tagsNameList.map(
                    (ignoredTag: string) =>
                        siteTagList?.find(
                            (tag: ITag) =>
                                tag.name.toLowerCase().trim() ===
                                ignoredTag.toLowerCase().trim()
                        )?.id
                ),
            };
            await changeUser(user?.id, changedUser);
            logIn(changedUser);
            hideModal();
            setLoading(false);
        };
        fetchData();
    };

    return (
        <>
            <ModalTitle>Ignoring settings</ModalTitle>
            <form onSubmit={handleSubmit}>
                <StylizedTextarea
                    name={"Ignored categories"}
                    value={ignoredCategories.join(',')}
                    rows={3}
                    onChange={(event) => {
                        setIgnoredCategories(event.target.value.split(","));
                    }}
                />
                <StylizedTextarea
                    name={"Ignored tags"}
                    value={ignoredTags.join(',')}
                    rows={3}
                    onChange={(event) => {
                        setIgnoredTags(event.target.value.split(","));
                    }}
                />
                <StylizedSubmitButton
                    name={"Save"}
                    loading={loading}
                    disabled={loading}
                />
            </form>
            <StylizedLinkButton
                name={"Change Name"}
                onClick={openSettingsNameModal}
            />
            <StylizedLinkButton
                name={"Change Password"}
                onClick={openSettingsPasswordModal}
            />
        </>
    );
};

export default SettingsMain;
