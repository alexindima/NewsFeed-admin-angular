import React from "react";
import {ISuggestedNews} from "../../../types/ISuggestedNews";
import styles from './News.module.scss'
import {useNavigate} from 'react-router-dom';

const News = ({news}: { news: ISuggestedNews }) => {
    const navigate = useNavigate()

    const createdDate = new Date(news.createdDate)

    const clickHandle = () => {
        navigate(`/article/${news.id}`)
    }

    return (
        <div onClick={clickHandle} className={styles.suggestedNews}>
            <div className={styles.suggestedNews__time}>
                <div>{createdDate.toLocaleDateString()}</div>
                <div>{createdDate.toLocaleTimeString()}</div>
            </div>
            <div className={styles.suggestedNews__title}>{news.mainTitle}</div>
        </div>
    )
}

export default News