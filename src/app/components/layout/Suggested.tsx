import React, {useContext, useEffect, useState} from "react";
import News from "./suggested/News";
import styles from "./Suggested.module.scss";
import NewsFilter from "../../../lib/NewsFilter";
import {userContext} from "../../context/UserContext";
import {Article} from "../../../types/Article";
import Spinner from "../common/Spinner";
import NoResult from "../common/NoResult";
import {apiContext} from "../../context/ApiContext";
import {siteContext} from "../../context/SiteContext";
import {Link} from "react-router-dom";

const Suggested = () => {
    const loadingIsAllowed = useContext(userContext).loadingIsAllowed;
    const user = useContext(userContext).user;
    const fetchAllArticles = useContext(apiContext).fetchAllArticles;
    const suggestedNews = useContext(siteContext).suggestedNews;

    const [articles, setArticles] = useState<Article[]>([]);
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (suggestedNews) {
            setLoading(false);
        }
    }, [suggestedNews]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const articles = await fetchAllArticles();
            const filteredArticles = NewsFilter({
                articles: articles,
                ignoredCategories: user?.ignoredCategories || [],
                ignoredTags: user?.ignoredTags || []
            });
            setArticles(filteredArticles);
            setLoading(false);
        };
        if (loadingIsAllowed) fetch();
    }, [user?.ignoredCategories, user?.ignoredTags, loadingIsAllowed, fetchAllArticles]);

    useEffect(() => {
        const newsArray = articles.filter((article) => {
            let articleIsSuggested = false;
            suggestedNews?.every((ID: number) => {
                if (article.id === ID) {
                    articleIsSuggested = true;
                    return false;
                }
                return true;
            });
            return articleIsSuggested;
        });
        setNews(newsArray);
    }, [suggestedNews, articles]);

    return (
        <div className="layout__suggested">
            <div className={styles.suggestedContainer}>
                {loading && <Spinner color={"#000000"} size={20}/>}
                {!!news.length || loading || <NoResult/>}
                {news.map((news) => (
                    <Link
                        key={news.id}
                        className={styles.suggestedNews}
                        to={`/articles/${news.id}`}
                    >
                        <News news={news}/>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Suggested;
