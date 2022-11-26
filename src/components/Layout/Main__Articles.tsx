import React, {useContext, useEffect, useState} from "react";

import Articles__Article from "./Articles__Article";
import axios from "axios";
import UserContext from "../../Context/Context";
import NewsFilter from "../../lib/NewsFilter";

const Main__Articles = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const user = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3030/articles',
            );

            /* Дальше идет фильтрация данных с бека по игнорируемым категориям и тегам
            в идеале это должен делать бек, но пока так
             */
            const filteredArray = NewsFilter(result.data, user.current.ignoredCategories, user.current.ignoredTags)
            setArticles(filteredArray);
        };
        fetchData();
    }, []);

    return (
        <div>
            {articles.map(article => <Articles__Article key={article.id} article={article}/>)}
        </div>
    )
}

export default Main__Articles