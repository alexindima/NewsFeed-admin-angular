import React, {useContext} from "react";
import {ISuggestedNews} from "../../../types/ISuggestedNews";
import {siteContext} from "../../../Context/SiteContext";
import styles from './News.module.scss'

const News = ({news}: {news: ISuggestedNews}) => {
    const [createdDate, createdTime] = news.createdDate.split(" ")

    const chooseArticleToShow = useContext(siteContext).chooseArticleToShow;

    return (
        <div onClick={() => chooseArticleToShow(news.id)} className={styles.suggestedNews}>
            <div className={styles.suggestedNews__time}>
                <div>{createdDate}</div>
                <div>{createdTime}</div>
            </div>
            <div className={styles.suggestedNews__title}>{news.mainTitle}</div>
        </div>
    )
}

export default News