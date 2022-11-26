import React from "react";
import "./Main__Articles.scss"
import Plug1 from "../../img/plug1.jpg"
import Plug2 from "../../img/plug2.jpg"
import Plug3 from "../../img/plug3.jpg"
import Plug4 from "../../img/plug4.jpg"
import Plug5 from "../../img/plug5.jpg"

// вся магия будет тут походу
const Articles__Article = ( {article} ) => {
    return (
        <article className="article">
                <div className="article__header ">
                    <div className="article__date">{article.date}<span
                        className="article__date article__date&#45;&#45;update"> (updated {article.upgradeDate})</span>
                    </div>
                    <div className="article__title-main">{article.mainTitle}
                    </div>
                    <h1 className="article__title-second">{article.secondTitle}</h1>
                    <div className="article__photo">
                        <img src={ Plug1 } alt="Plug1" className="article__photo-img"/>
                        <span className="article__photo-text">{article.mainPhotoDescription}</span>
                    </div>
                </div>
                <div className="article__body">{article.article}</div>
            </article>
    )
}

export default Articles__Article