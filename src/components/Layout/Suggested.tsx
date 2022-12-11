import React, {useContext, useEffect, useState} from "react";
import News from "./Suggested/News";
import styles from "./Suggested.module.scss"
import NewsFilter from "../../lib/NewsFilter";
import {userContext} from "../../Context/UserContext";
import {IArticle} from "../../types/IArticle";
import Spinner from "../common/Spinner";
import NoResult from "../common/NoResult";
import {apiContext} from "../../Context/ApiContext";


const Suggested = () => {
    const user = useContext(userContext).user;
    const fetchSuggestedNews = useContext(apiContext).fetchSuggestedNews
    const fetchAllArticles = useContext(apiContext).fetchAllArticles

    const [newsID, setNewsID] = useState([])
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [news, setNews] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const suggestedNews = await fetchSuggestedNews()
            setNewsID(suggestedNews)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const articles = await fetchAllArticles()
            const filteredArticles = NewsFilter(articles, user?.ignoredCategories, user?.ignoredTags)
            setArticles(filteredArticles)
            setLoading(false)
        }
        fetch()
        // eslint-disable-next-line
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