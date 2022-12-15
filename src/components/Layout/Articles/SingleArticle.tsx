import React, {useContext, useEffect, useState} from "react";
import {IArticle} from "../../../types/IArticle";
import Article from "../Articles/Article";
import Spinner from "../../common/Spinner";
import {apiContext} from "../../../Context/ApiContext";
import {useParams} from "react-router-dom";
import {siteContext} from "../../../Context/SiteContext";

const SingleArticle = () => {
    const setSingleArticle = useContext(siteContext).setSingleArticle
    const fetchOneArticle = useContext(apiContext).fetchOneArticle

    const {id} = useParams()

    const [articleToShow, setArticleToShow] = useState<IArticle>(Object)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const article = await fetchOneArticle(id)
            setArticleToShow(article)
            setLoading(false)
        }
        fetchData()
        // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        setSingleArticle()
        // eslint-disable-next-line
    }, [id])


    return (
        <>
            {loading && <Spinner color={"#000000"} size={20}/>}
            {!loading && <Article article={articleToShow} preview={false}/>}
        </>
    )
}

export default SingleArticle