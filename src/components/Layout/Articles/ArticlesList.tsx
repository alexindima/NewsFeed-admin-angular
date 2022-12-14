import React, {useContext, useEffect, useRef, useState} from "react";
import {IArticle} from "../../../types/IArticle";
import Article from "../Articles/Article";
import {userContext} from "../../../Context/UserContext";
import NewsFilter from "../../../lib/NewsFilter";
import {siteContext} from "../../../Context/SiteContext";
import InfinityScroll from "../../common/InfinityScroll";
import {apiContext} from "../../../Context/ApiContext";
import {useLocation} from "react-router-dom";

const ArticlesList = () => {
    const ARTICLES_TO_LOAD = 5

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const currentCategory = Number(searchParams.get('category'))
    const currentTag = Number(searchParams.get('tag'))
    const currentSearch = searchParams.get('search')

    const setSiteState = useContext(siteContext).setSiteState;

    const loadingIsAllowed = useContext(userContext).loadingIsAllowed
    const user = useContext(userContext).user;
    const currentPage = useContext(siteContext).currentPage
    const setCurrentPage = useContext(siteContext).setCurrentPage
    const fetchPagedArticles = useContext(apiContext).fetchPagedArticles

    const [articles, setArticles] = useState<IArticle[]>([])
    const [needToLoad, setNeedToLoad] = useState(false)
    const [loading, setLoading] = useState(true)

    let pageIsLoading = useRef(false)
    let dataIsMissing = useRef(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await fetchPagedArticles(currentPage.current, ARTICLES_TO_LOAD, currentSearch)
            const filteredArray = NewsFilter(
                result,
                user?.ignoredCategories,
                user?.ignoredTags,
                currentCategory,
                currentTag)
            dataIsMissing.current = !filteredArray.length
            if (!dataIsMissing.current) {
                const newArray = [...articles, ...filteredArray]
                setArticles(newArray)
            }
            setNeedToLoad(false)
            setCurrentPage(currentPage.current + 1)
            setLoading(false)
        }
        if (loadingIsAllowed && !pageIsLoading.current && needToLoad) {
            pageIsLoading.current = true
            fetchData()
            pageIsLoading.current = false
        }
        // eslint-disable-next-line
    }, [needToLoad])

    useEffect(() => {
            if (loadingIsAllowed) {
                setArticles([]) // понять почему не работает
                pageIsLoading.current = false
                setNeedToLoad(true)
                currentPage.current = 1
            }
        }, [
            loadingIsAllowed,
            currentPage,
            currentCategory,
            currentTag,
            currentSearch,
            user?.ignoredCategories,
            user?.ignoredTags,
        ]
    )

    useEffect(() => { // If query parameters were inserted by user
            if (currentCategory || currentTag || currentSearch) {
                setSiteState({
                    category: currentCategory,
                    tag: currentTag,
                    search: currentSearch
                })
            }
        }, []
    )

    const LoadMoreHandle = () => {
        setNeedToLoad(true)
    }

    return (
        <InfinityScroll
            action={LoadMoreHandle}
            loading={loading}
            noResults={dataIsMissing.current && !loading}>
            {articles.map((article: IArticle) => <Article key={article.id} article={article}
                                                          preview={true}/>)}
        </InfinityScroll>
    )
}

export default ArticlesList