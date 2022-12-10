import React, {useContext} from "react";
import {IArticle} from "../../../types/IArticle";
import {IArticleElement} from "../../../types/IArticleElement";
import styles from "./Article.module.scss"
import {siteContext} from "../../../Context/SiteContext";
import {ITag} from "../../../types/ITag";

const Article = ({article}: { article: IArticle }) => {
    const chooseTag = useContext(siteContext).chooseTag;
    const siteTagList = useContext(siteContext).siteTagList
    const createdDate = new Date(article.createdDate)
    const upgradeDate = new Date(article.upgradeDate)

    return (
        <article className={styles.article}>
            <div className={styles.article__header}>
                <div className={styles.article__createDate}>
                    {createdDate.toLocaleDateString()} {createdDate.toLocaleTimeString()}
                    <span className={styles.article__updateDate}>
                         &ensp;(updated {upgradeDate.toLocaleDateString()} {upgradeDate.toLocaleTimeString()})
                    </span>
                </div>
                <div className={styles.article__titleMain}>{article.mainTitle}
                </div>
                <h1 className={styles.article__titleSecond}>{article.secondTitle}</h1>
                <div className={styles.article__photo}>
                    <img src={article.mainPhoto} alt={article.mainPhotoDescription}
                         className={styles.article__photoImg}/>
                    <span className={styles.article__photoText}>{article.mainPhotoDescription}</span>
                </div>
            </div>
            <div>
                {article.body.map((el: IArticleElement) => {
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
            </div>
            <div className={styles.article__tags}>
                {article.tags.map((el, index) => (
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