import React, {useContext, useEffect, useState} from "react";
import Suggested__News from "./Suggested__News";
import "./Layout__Suggested.scss"
import axios from "axios";
import NewsFilter from "../../lib/NewsFilter";
import { UserContext } from "../../Context/Context";


const Layout__Suggested = () => {
    const userIgnoredCategories = useContext(UserContext).userIgnoredCategories;
    const userIgnoredTags = useContext(UserContext).userIgnoredTags;

    const [news, setNews] = useState<any[]>([]);

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
                    {news.map(news => <Suggested__News key={news.id} news={news}/>)}
                </div>
            </div>
    )
}

export default Layout__Suggested