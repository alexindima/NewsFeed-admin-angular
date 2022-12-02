import React, {useContext} from "react";
import {ISuggestedNews} from "../../../types/ISuggestedNews";
import {siteContext} from "../../../Context/SiteContext";

const News = ({news}: {news: ISuggestedNews}) => {
    const [createdDate, createdTime] = news.createdDate.split(" ")

    const chooseArticleToShow = useContext(siteContext).chooseArticleToShow;

    return (
        <div onClick={() => chooseArticleToShow(news.id)} className="suggested-news">
            <div className="suggested-news__time">
                <div>{createdDate}</div>
                <div>{createdTime}</div>
            </div>
            <div className="suggested-news__title">{news.mainTitle}</div>
        </div>
    )
}

export default News