import * as React from "react";
import "./Back.scss"
import {BiArrowBack} from "react-icons/bi";
import {useContext} from "react";
import {siteContext} from "../../Context/SiteContext";
import { RiCloseCircleFill } from "react-icons/ri";

const Back = () => {
    const clearAll              = useContext(siteContext).clearAll;
    const currentCategory       = useContext(siteContext).currentCategory;
    const currentTag            = useContext(siteContext).currentTag;
    const searchPhrase          = useContext(siteContext).searchPhrase;
    const articleToShowID       = useContext(siteContext).articleToShow;
    const clearCategory         = useContext(siteContext).clearCategory;
    const clearTag              = useContext(siteContext).clearTag;
    const clearSearchPhrase     = useContext(siteContext).clearSearchPhrase;
    const clearArticleToShow    = useContext(siteContext).clearArticleToShow;


    return (
        <div className="back">

            <div onClick={clearAll} className="layout__back back__container">
                <div className="back__icon-wrapper">
                    <BiArrowBack className="back__icon-wrapper-img" title="Go back" />
                </div>
                <div className="back__label-container">
                    <div className="back__label">
                        Go back
                    </div>
                </div>

            </div>
            <div className="back__info-container">
                {!!currentCategory && <div onClick={clearCategory} className="back__info">Current category: {currentCategory} <RiCloseCircleFill/></div>}
                {!!currentTag && <div onClick={clearTag} className="back__info">Current tag: {currentTag} <RiCloseCircleFill/></div>}
                {!!searchPhrase && <div onClick={clearSearchPhrase} className="back__info">Current search: {searchPhrase} <RiCloseCircleFill/></div>}
                {!!articleToShowID && <div onClick={clearArticleToShow} className="back__info">Selected suggested news <RiCloseCircleFill/></div>}
            </div>

        </div>
    )
}

export default Back