import React, {useContext, useState} from "react";
import {IArticle} from "../../../types/IArticle";
import {IArticleElement} from "../../../types/IArticleElement";
import styles from "./Article.module.scss"
import {siteContext} from "../../../Context/SiteContext";
import {ITag} from "../../../types/ITag";

interface IArticleProps {
    article: IArticle
    preview: boolean
}

const Article = (props: IArticleProps) => {
    const [articleIsCollapsed, setArticleIsCollapsed] = useState(props.preview)

    const chooseTag = useContext(siteContext).chooseTag;
    const siteTagList = useContext(siteContext).siteTagList
    const createdDate = new Date(props.article.createdDate)
    const upgradeDate = new Date(props.article.upgradeDate)

    return (
        <article className={styles.article}>
            <div className={styles.article__header}>
                <div className={styles.article__createDate}>
                    {createdDate.toLocaleDateString()} {createdDate.toLocaleTimeString()}
                    <span className={styles.article__updateDate}>
                         &ensp;(updated {upgradeDate.toLocaleDateString()} {upgradeDate.toLocaleTimeString()})
                    </span>
                </div>
                <div className={styles.article__titleMain}>{props.article.mainTitle}
                </div>
                <h1 className={styles.article__titleSecond}>{props.article.secondTitle}</h1>
                <div className={styles.article__photo}>
                    <img src={props.article.mainPhoto} alt={props.article.mainPhotoDescription}
                         className={styles.article__photoImg}/>
                    <span className={styles.article__photoText}>{props.article.mainPhotoDescription}</span>
                </div>
            </div>
            {articleIsCollapsed &&
                <div className={styles.article__expand} onClick={() => setArticleIsCollapsed(false)}>
                    Expand...
                </div>}
            {articleIsCollapsed ||
                <div>
                    {props.article.body.map((el: IArticleElement) => {
                        switch (el.type) {
                            case "text":
                                return <div key={el.id}>{el.data}</div>
                            case "image":
                                return <img key={el.id} className={styles.imgFluid} src={el.href} alt={el.alt}></img>
                            case "anchor":
                                return <a key={el.id} href={el.href} rel="noreferrer" target="_blank">{el.data}</a>
                            default:
                                return <></>
                        }
                    })}
                </div>}
            <div className={styles.article__tags}>
                {props.article.tags.map((el, index) => (
                    <div onClick={() => chooseTag(el)} key={index} className={styles.article__tag}>
                        {siteTagList?.find((tag: ITag) =>
                            tag.id === el).name}
                    </div>)
                )}
            </div>
        </article>
    )
}

export default Article