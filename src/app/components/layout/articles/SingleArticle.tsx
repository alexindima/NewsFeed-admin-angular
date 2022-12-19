import React, {useContext, useEffect, useState} from "react";
import {Article} from "../../../../types/Article";
import ArticleComponent from "./ArticleComponent";
import Spinner from "../../common/Spinner";
import {apiContext} from "../../../context/ApiContext";
import {useParams} from "react-router-dom";
import {siteContext} from "../../../context/SiteContext";

const SingleArticle = () => {
    const isSingleArticle = useContext(siteContext).siteState?.isSingleArticle;
    const setSingleArticle = useContext(siteContext).setSingleArticle;
    const fetchOneArticle = useContext(apiContext).fetchOneArticle;

    const {id} = useParams();

    const [articleToShow, setArticleToShow] = useState<Article>(Object);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const article = await fetchOneArticle(id);
            setArticleToShow(article);
            setLoading(false);

        };
        if (id) fetchData();
    }, [id, fetchOneArticle]);

    useEffect(() => {
        if (articleToShow && !isSingleArticle) setSingleArticle();
    }, [articleToShow, isSingleArticle, setSingleArticle])

    return (
        <>
            {loading && <Spinner color={"#000000"} size={20}/>}
            {!loading && <ArticleComponent article={articleToShow} preview={false}/>}
        </>
    );
};

export default SingleArticle;
