import React, {useContext, useEffect, useState} from "react";
import {CgMenuRound, CgPlayListCheck} from 'react-icons/cg';
import "./Categories.scss"
import classNames from "classnames";
import {userContext} from "../../Context/UserContext";
import {siteContext} from "../../Context/SiteContext";
import {ICategory} from "../../types/ICategory";

const Categories = () => {
    const [categoryList, setCategoryList] = useState<ICategory[] | null>(null)
    const [categoryIsClosed, setCategoryIsClosed] = useState(true)

    const user = useContext(userContext).user;
    const siteState = useContext(siteContext).siteState
    const siteCategoryList = useContext(siteContext).siteCategoryList
    const chooseCategory = useContext(siteContext).chooseCategory


    const showOrHideCategory = () => {
        setCategoryIsClosed(!categoryIsClosed)
    }

    useEffect(() => {
        setCategoryList(siteCategoryList?.filter((category: ICategory) => {
            let categoryIsIgnored = false
            user?.ignoredCategories.every((userIgnoredCategory: number) => {
                if (category.id === userIgnoredCategory) {
                    categoryIsIgnored = true
                    return false
                }
                return true
            })
            return !categoryIsIgnored
        }))
    }, [user?.ignoredCategories, siteCategoryList])

    const categoryWindowClass = classNames({
        "icon-wrapper__popup": true,
        "hidden": categoryIsClosed,
    })
    return (
        <div className="icon-wrapper" onClick={showOrHideCategory}>
            {!!siteState?.category || <CgMenuRound className="icon-wrapper__img" title="Category"/>}
            {!!siteState?.category && <CgPlayListCheck className="icon-wrapper__img" title="Category"/>}
            <div id="category-window" className={categoryWindowClass}>
                <div className="category-dropdown">
                    {
                        categoryList?.map((category: ICategory) => (
                            <button onClick={() => chooseCategory(category.id)}
                                    className={
                                        category === siteState?.category
                                            ? "category-dropdown__element category-dropdown__element--active"
                                            : "category-dropdown__element"
                                    }
                                    key={category.id}>{category.name}</button>)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Categories