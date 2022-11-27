import React, {useContext, useEffect, useState} from "react";
import { CgMenuRound } from 'react-icons/cg';
import "./Header__Categories.scss"
import classNames from "classnames";
import axios from "axios";
import { UserContext } from "../../Context/Context";

const Header__Categories = () => {
    const [categoryList, setCategoryList] = useState([])
    const [categoryIsClosed, setCategoryIsClosed] =useState(true)
    const currentCategory = useContext(UserContext).currentCategory
    const chooseCategory = useContext(UserContext).chooseCategory
    const clearCategory = useContext(UserContext).clearCategory


    function showOrHideCategory () {
        setCategoryIsClosed(!categoryIsClosed)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3030/categories',
            );
            setCategoryList(result.data)
        };
        fetchData();
    },[])

    const categoryWindowClass = classNames({
        "icon-wrapper__popup": true,
        "hidden": categoryIsClosed,
    })
    return (
        <div className="icon-wrapper"  onClick={showOrHideCategory}>
            <CgMenuRound id="dropdown" className="icon-wrapper__img" title="Category"/>
            <div id="category-window" className={categoryWindowClass}>
                <div className="category-dropdown">
                    {currentCategory && <button onClick={clearCategory} className="category-dropdown__element" >Clear category</button>}
                    {categoryList.map((el, index) => <button onClick={() => chooseCategory(el)} className="category-dropdown__element" key={index}>{el}</button>)}
                </div>
            </div>
        </div>
    )
}

export default Header__Categories