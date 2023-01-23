import React, {useContext, useEffect, useRef, useState} from "react";
import {Article} from "../../../../types/Article";
import ArticleComponent from "./ArticleComponent";
import {userContext} from "../../../context/UserContext";
import NewsFilter from "../../../../lib/NewsFilter";
import {siteContext} from "../../../context/SiteContext";
import InfinityScroll from "../../common/InfinityScroll";
import {useLocation} from "react-router-dom";
import useApi from "../../../../hooks/useApi";
import articlesApi from "../../../../api/articles";

const ArticlesList = () => {
    const ARTICLES_TO_LOAD = 5;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const currentCategory = Number(searchParams.get("category"));
    const currentTag = Number(searchParams.get("tag"));
    const currentSearch = searchParams.get("search");

    const setSiteState = useContext(siteContext).setSiteState;

    const user = useContext(userContext).user;
    const loadingIsAllowed = useContext(userContext).loadingIsAllowed;
    const fetchPagedArticles = useApi(articlesApi.fetchPagedArticles);

    const [articles, setArticles] = useState<Article[]>([]);
    const [needToLoad, setNeedToLoad] = useState(false);
    const [needToReload, setNeedToReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dataWasGot, setDataWasGot] = useState(false);

    let pageIsLoading = useRef(false);
    let dataIsMissing = useRef(false);
    const currentPage = useRef(1);

    useEffect(() => {
        if (loadingIsAllowed && !pageIsLoading.current && needToLoad) {
            setLoading(true);
            pageIsLoading.current = true;
            fetchPagedArticles.request(
                currentPage.current,
                ARTICLES_TO_LOAD,
                currentSearch
            );
        }
    }, [needToLoad, currentSearch, fetchPagedArticles, loadingIsAllowed]);

    useEffect(() => {
        setDataWasGot(true);
    }, [fetchPagedArticles.data]);

    useEffect(() => {
        if (dataWasGot) {
            setDataWasGot(false);
            const data: Article[] | null = fetchPagedArticles.data
            if (data && pageIsLoading.current) {
                const result: Article[] = data
                setLoading(fetchPagedArticles.loading);
                pageIsLoading.current = false;
                const filteredArray = NewsFilter({
                    articles: result,
                    ignoredCategories: user?.ignoredCategories || [],
                    ignoredTags: user?.ignoredTags || [],
                    categoryToShow: currentCategory,
                    tagToShow: currentTag,
                });
                dataIsMissing.current = !filteredArray.length;
                if (!dataIsMissing.current) {
                    const newArray = [...articles, ...filteredArray];
                    setArticles(newArray);
                } else {
                    if (result.length) {
                        setNeedToReload(true);
                    }
                }
                setNeedToLoad(false);
                currentPage.current = currentPage.current + 1;
            }
        }
    }, [
        needToLoad,
        dataWasGot,
        articles,
        currentCategory,
        currentSearch,
        currentTag,
        fetchPagedArticles,
        loadingIsAllowed,
        user?.ignoredCategories,
        user?.ignoredTags,
    ]);

    useEffect(() => {
        if (needToReload) {
            setNeedToLoad(true);
            setNeedToReload(false);
        }
    }, [needToReload]);

    useEffect(() => {
        if (loadingIsAllowed) {
            setArticles([]);
            pageIsLoading.current = false;
            setNeedToLoad(true);
            currentPage.current = 1;
        }
    }, [
        loadingIsAllowed,
        currentCategory,
        currentTag,
        currentSearch,
        user?.ignoredCategories,
        user?.ignoredTags,
    ]);

    useEffect(() => {
        // If query parameters were inserted by user
        if (currentCategory || currentTag || currentSearch) {
            setSiteState({
                category: currentCategory,
                tag: currentTag,
                search: currentSearch,
            });
        }
    }, [currentCategory, currentTag, currentSearch, setSiteState]);

    const LoadMoreHandle = () => {
        setNeedToLoad(true);
    };

    return (
        <InfinityScroll
            action={LoadMoreHandle}
            loading={loading}
            noResults={dataIsMissing.current && !loading}
        >
            {articles.map((article: Article) => (
                <ArticleComponent key={article.id} article={article} preview={true}/>
            ))}
        </InfinityScroll>
    );
};

export default ArticlesList;
