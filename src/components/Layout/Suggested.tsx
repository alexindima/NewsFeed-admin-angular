import React, {useContext, useEffect, useState} from "react";
import News from "./Suggested/News";
import styles from "./Suggested.module.scss"
import axios from "axios";
import NewsFilter from "../../lib/NewsFilter";
import {userContext} from "../../Context/UserContext";
import {IArticle} from "../../types/IArticle";
import Spinner from "../common/Spinner";
import NoResult from "../common/NoResult";


const Suggested = () => {
    const user = useContext(userContext).user;

    const [newsID, setNewsID] = useState([])
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [news, setNews] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(true);

    // это тоже все должен делать бэк, приходится извращаться
    useEffect(() => {
        const fetchSuggestedNews = async () => {
            setLoading(true)
            const resultID = await axios(
                'http://localhost:3030/suggestedNews',
            );
            setNewsID(resultID.data)
        }
        fetchSuggestedNews()
    }, [])

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true)
            const resultID = await axios('http://localhost:3030/articles')
            const filteredArticles = NewsFilter(resultID.data, user?.ignoredCategories, user?.ignoredTags)
            setArticles(filteredArticles)
            setLoading(false)
        }
        fetchArticles()
    }, [user?.ignoredCategories, user?.ignoredTags]);

    useEffect(() => {
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
        <div className="layout__suggested">
            <div className={styles.suggestedContainer}>
                {loading && <Spinner color={"#000000"} size={20}/>}
                {!!news.length || loading || <NoResult/>}
                {news.map(news => <News key={news.id} news={news}/>)}
            </div>
        </div>
    )
}

export default Suggested