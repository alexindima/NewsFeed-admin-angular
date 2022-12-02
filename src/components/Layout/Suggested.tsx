import React, {useContext, useEffect, useState} from "react";
import News from "./Suggested/News";
import "./Suggested.scss"
import axios from "axios";
import NewsFilter from "../../lib/NewsFilter";
import { userContext } from "../../Context/UserContext";
import {IArticle} from "../../types/IArticle";


const Suggested = () => {
    const userIgnoredCategories = useContext(userContext).userIgnoredCategories;
    const userIgnoredTags       = useContext(userContext).userIgnoredTags;

    const [newsID, setNewsID] = useState([])
    const [articles, setArticles] = useState<IArticle[]>([]);

    const [news, setNews] = useState<IArticle[]>([]);

    // это тоже все должен делать бэк, приходится извращаться
    useEffect(() => {
        const fetchSuggestedNews = async () => {
            const resultID = await axios(
                'http://localhost:3030/suggestedNews',
            );
            setNewsID(resultID.data)
        }
        fetchSuggestedNews()
    },[])

    useEffect( () => {
        const fetchArticles = async () => {
            const resultID = await axios(
                'http://localhost:3030/articles',
            );
            const filteredArticles = NewsFilter(resultID.data, userIgnoredCategories, userIgnoredTags)
            setArticles(filteredArticles)
        }
        fetchArticles()
    }, [userIgnoredCategories, userIgnoredTags]);

    useEffect( () => {
        const newsArray = articles.filter((article) => {
            let articleIsSuggested = false
            newsID.every((ID) => {
                if (article.id === ID) {
                    articleIsSuggested = true
                    return false
                }
                return true
            })
            return articleIsSuggested
        })
        setNews(newsArray)

    }, [newsID, articles]);

    return (
        <div className="layout__suggested suggested">
                <div className="suggested-container">
                    {news.map(news => <News key={news.id} news={news}/>)}
                </div>
            </div>
    )
}

export default Suggested