import React, {useContext, useEffect, useState} from "react";
import {CgMenuRound, CgPlayListCheck} from 'react-icons/cg';
import "./Categories.scss"
import classNames from "classnames";
import axios from "axios";
import {userContext} from "../../Context/UserContext";
import {siteContext} from "../../Context/SiteContext";

const Categories = () => {
    const [categoryList, setCategoryList] = useState([])
    const [categoryIsClosed, setCategoryIsClosed] = useState(true)

    const user = useContext(userContext).user;
    const siteState = useContext(siteContext).siteState
    const chooseCategory = useContext(siteContext).chooseCategory


    const showOrHideCategory = () => {
        setCategoryIsClosed(!categoryIsClosed)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:3030/categories')
            setCategoryList((result.data.filter((category: string) => {
                let categoryIsIgnored = false
                user?.ignoredCategories.every((userIgnoredCategory: string) => {
                    if (category.toLowerCase() === userIgnoredCategory.toLowerCase()) {
                        categoryIsIgnored = true
                        return false
                    }
                    return true
                })
                return !categoryIsIgnored
            })))
        };
        fetchData();
    }, [user?.ignoredCategories])

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
                        categoryList.map((el, index) => (
                            <button onClick={() => chooseCategory(el)}
                                    className={
                                        el === siteState?.category
                                            ? "category-dropdown__element category-dropdown__element--active"
                                            : "category-dropdown__element"
                                    }
                                    key={index}>{el}</button>)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Categories