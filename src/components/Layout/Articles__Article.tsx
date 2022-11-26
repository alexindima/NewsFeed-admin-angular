import React from "react";
import "./Articles__Article.scss"

// вся магия будет тут походу
const Articles__Article = ( {article} ) => {
    console.log(article)
    return (
        <article className="article">
                <div className="article__header ">
                    <div className="article__date">{article.createdDate}<span
                        className="article__date article__date&#45;&#45;update"> (updated {article.upgradeDate})</span>
                    </div>
                    <div className="article__title-main">{article.mainTitle}
                    </div>
                    <h1 className="article__title-second">{article.secondTitle}</h1>
                    <div className="article__photo">
                        <img src={ article.mainPhoto } alt="Plug1" className="article__photo-img"/>
                        <span className="article__photo-text">{article.mainPhotoDescription}</span>
                    </div>
                </div>
                <div>
                    {article.body.map(el => {
                        console.log(el)
                        switch (el.type) {
                            case "text":
                                return <>{el.data}</>
                            case "image":
                                return <img className="img-fluid" src={el.href} alt={el.alt}></img>
                            case "anchor":
                                return <a href={el.href}>{el.data}</a>
                            default: return <></>
                        }
                    })}
                </div>
            </article>
    )
}

export default Articles__Article