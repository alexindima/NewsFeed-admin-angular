import React, {useContext, useEffect, useState} from "react";
import {IArticle} from "../../../types/IArticle";
import Article from "../Articles/Article";
import axios from "axios";
import { userContext } from "../../../Context/UserContext";

import NewsFilter from "../../../lib/NewsFilter";
import {siteContext} from "../../../Context/SiteContext";

const Articles = () => {
    const userIgnoredCategories = useContext(userContext).userIgnoredCategories;
    const userIgnoredTags       = useContext(userContext).userIgnoredTags;
    const currentCategory       = useContext(siteContext).currentCategory;
    const currentTag            = useContext(siteContext).currentTag;
    const searchPhrase          = useContext(siteContext).searchPhrase;
    const articleToShowID       = useContext(siteContext).articleToShow;

    // Из-за того что нет бэкенда дальше будет жесть, всю бэковую работу будет делать фронт
    const [articles, setArticles]                           = useState<IArticle[]>([]);
    const [articleToShow, setArticleToShow]                 = useState<IArticle>(Object)
    const [articleToShowIsReady, setArticleToShowIsReady]   = useState(false)

    useEffect(() => {
        let url = 'http://localhost:3030/articles'
        if (currentCategory || searchPhrase) {
            url += '?'
            if (currentCategory) {
                url += `category=${currentCategory.toLowerCase()}`
                if (searchPhrase) {url += '&'}
            }
            if (searchPhrase) {
                url += `q=${searchPhrase.replace(/ /g, '+')}`
            }
        }
        const fetchData = async () => {
            const result = await axios(url);
            const filteredArray = NewsFilter(result.data, userIgnoredCategories, userIgnoredTags, currentTag)
            setArticles(filteredArray);
        };
        fetchData();
    }, [currentCategory, currentTag, userIgnoredCategories, userIgnoredTags, searchPhrase]);

    useEffect(() => {
        setArticleToShowIsReady(false)
    }, [articleToShowID]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:3030/articles/${articleToShowID}`);
            setArticleToShowIsReady(true)
            setArticleToShow(result.data);
        };
        if (articleToShowID) fetchData();
    }, [articleToShowID]);

    return (
        <div>
            {!!articleToShowID && articleToShowIsReady && <Article article={articleToShow}/>}
            {!!articleToShowID || articles.map((article: IArticle) => <Article key={article.id} article={article}/>)}
        </div>
    )
}

export default Articles