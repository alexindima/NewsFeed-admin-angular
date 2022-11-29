import React, {useContext, useEffect, useState} from "react";
import {IArticle} from "../../type/IArtickle";
import Articles__Article from "./Articles__Article";
import axios from "axios";
import { UserContext } from "../../Context/Context";

import NewsFilter from "../../lib/NewsFilter";

const Main__Articles = () => {
    const userIgnoredCategories = useContext(UserContext).userIgnoredCategories;
    const userIgnoredTags = useContext(UserContext).userIgnoredTags;

    // Из-за того что нет бэкенда дальше будет жесть, всю бэковую работу будет делать фронт
    const [originalArticles, setOriginalArticles] = useState<any[]>([]);
    const [articles, setArticles] = useState<IArticle[]>([]);

        useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3030/articles',
            );
            const filteredArray = NewsFilter(result.data, userIgnoredCategories, userIgnoredTags)
            setArticles(filteredArray);
        };
        fetchData();
    }, []);

    return (
        <div>
            {articles.map((article: IArticle) => <Articles__Article key={article.id} article={article}/>)}
        </div>
    )
}

export default Main__Articles