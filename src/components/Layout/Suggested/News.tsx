import React from "react";
import {ISuggestedNews} from "../../../types/ISuggestedNews";

const News = ({news}: {news: ISuggestedNews}) => {
    return (
        <a href="#" className="suggested-news">
            <div className="suggested-news__time">{news.createdDate}</div>
            <div className="suggested-news__title">{news.mainTitle}</div>
        </a>
    )
}

export default News