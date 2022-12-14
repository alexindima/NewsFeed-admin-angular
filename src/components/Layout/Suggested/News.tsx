import React from "react";
import {ISuggestedNews} from "../../../types/ISuggestedNews";
import styles from './News.module.scss'

const News = ({news}: { news: ISuggestedNews }) => {
    const createdDate = new Date(news.createdDate)

    return (
        <div className={styles.suggestedNews}>
            <div className={styles.suggestedNews__time}>
                <div>{createdDate.toLocaleDateString()}</div>
                <div>{createdDate.toLocaleTimeString()}</div>
            </div>
            <div className={styles.suggestedNews__title}>{news.mainTitle}</div>
        </div>
    )
}

export default News