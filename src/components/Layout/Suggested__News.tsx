import React from "react";
import {ISuggestedNews} from "../../type/ISuggestedNews";

const Suggested__News = ({news}: {news: ISuggestedNews}) => {
    return (
        <a href="#" className="suggested-news">
            <div className="suggested-news__time">{news.time}</div>
            <div className="suggested-news__title">{news.title}</div>
        </a>
    )
}

export default Suggested__News