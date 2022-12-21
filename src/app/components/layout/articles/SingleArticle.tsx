import React, {useContext, useEffect, useRef, useState} from "react";
import {Article} from "../../../../types/Article";
import ArticleComponent from "./ArticleComponent";
import Spinner from "../../common/Spinner";
import {useParams} from "react-router-dom";
import {siteContext} from "../../../context/SiteContext";
import useApi from "../../../../hooks/useApi";
import articlesApi from "../../../../api/articles"

const SingleArticle = () => {
    const isSingleArticle = useContext(siteContext).siteState?.isSingleArticle;
    const setSingleArticle = useContext(siteContext).setSingleArticle;
    const fetchOneArticle = useApi(articlesApi.fetchOneArticle);

    const {id} = useParams();
    const previousId = useRef("")

    const [articleToShow, setArticleToShow] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id !== previousId.current) {
            previousId.current = id!
            setLoading(true);
            fetchOneArticle.request(id!)
        }
    }, [id, fetchOneArticle])

    useEffect(() => {
        setLoading(fetchOneArticle.loading)
        if (fetchOneArticle.data) {
            setArticleToShow(fetchOneArticle.data);
        }
    }, [fetchOneArticle])

    useEffect(() => {
        if (articleToShow && !isSingleArticle) setSingleArticle();
    }, [articleToShow, isSingleArticle, setSingleArticle])

    return (
        <>
            {loading && <Spinner color={"#000000"} size={20}/>}
            {!loading && articleToShow && <ArticleComponent article={articleToShow} preview={false}/>}
        </>
    );
};

export default SingleArticle;
