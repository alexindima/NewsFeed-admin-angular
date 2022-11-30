import React, {useContext, useEffect, useState} from "react";
import News from "./Suggested/News";
import "./Suggested.scss"
import axios from "axios";
import NewsFilter from "../../lib/NewsFilter";
import { userContext } from "../../Context/UserContext";
import {IArticle} from "../../types/IArticle";


const Suggested = () => {
    const userIgnoredCategories = useContext(userContext).userIgnoredCategories;
    const userIgnoredTags       = useContext(userContext).userIgnoredTags;

    const [news, setNews] = useState<IArticle[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3030/suggestedNews',
            );
            /* Дальше идет фильтрация данных с бека по игнорируемым категориям и тегам
            в идеале это должен делать бек, но пока так
             */
            const filteredArray = NewsFilter(result.data, userIgnoredCategories, userIgnoredTags)
            setNews(filteredArray);
        };
        fetchData();
    }, []);


    return (
        <div className="layout__suggested suggested">
                <div className="suggested-container">
                    {news.map(news => <News key={news.id} news={news}/>)}
                </div>
            </div>
    )
}

export default Suggested