import React, {useEffect, useState} from "react";
import "./Main__Articles.scss"
import Articles__Article from "./Articles__Article";
import axios from "axios";

const Main__Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        console.log('effect')
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3030/articles',
            );
            console.log(result.data)
            setArticles(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Articles__Article />
            <Articles__Article />
            <Articles__Article />
            <Articles__Article />
            <Articles__Article />
            <Articles__Article />

        </div>
    )
}

export default Main__Articles