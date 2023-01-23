import React from "react";
import {SuggestedNews} from "../../../../types/SuggestedNews";
import styles from "./News.module.scss";

const News = ({news}: { news: SuggestedNews }) => {
    const createdDate = new Date(news.createdDate);

    return (
        <div className={styles.suggestedNews}>
            <div className={styles.suggestedNews__time}>
                <div>{createdDate.toLocaleDateString()}</div>
                <div>{createdDate.toLocaleTimeString()}</div>
            </div>
            <div className={styles.suggestedNews__title}>{news.mainTitle}</div>
        </div>
    );
};

export default News;
