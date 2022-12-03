import * as React from "react";
import styles from "./Back.module.scss"
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
        <div className={styles.back}>
            <div onClick={clearAll} className={styles.back__container}>
                <div className={styles.back__iconWrapper}>
                    <BiArrowBack title="Go back" />
                </div>
                <div className={styles.back__labelContainer}>
                        Go back
                </div>
            </div>
            <div className={styles.back__infoContainer}>
                {!!currentCategory &&
                    <div onClick={clearCategory} className={styles.back__info}>
                        Current category: {currentCategory} <RiCloseCircleFill/>
                    </div>}
                {!!currentTag &&
                    <div onClick={clearTag} className={styles.back__info}>
                        Current tag: {currentTag} <RiCloseCircleFill/>
                    </div>}
                {!!searchPhrase &&
                    <div onClick={clearSearchPhrase} className={styles.back__info}>
                        Current search: {searchPhrase} <RiCloseCircleFill/>
                    </div>}
                {!!articleToShowID &&
                    <div onClick={clearArticleToShow} className={styles.back__info}>
                        Selected suggested news <RiCloseCircleFill/>
                    </div>}
            </div>
        </div>
    )
}

export default Back