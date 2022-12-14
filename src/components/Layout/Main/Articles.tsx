import React from "react";
import {Route, Routes} from "react-router-dom";
import SingleArticle from "../Articles/SingleArticle";
import ArticlesList from "../Articles/ArticlesList";

const Articles = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ArticlesList/>
            }/>
            <Route path={"/articles/:id"} element={<SingleArticle/>}/>
        </Routes>
    )
}

export default Articles