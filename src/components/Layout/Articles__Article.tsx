import React from "react";
import Plug1 from "../../img/plug1.jpg"
import Plug2 from "../../img/plug2.jpg"
import Plug3 from "../../img/plug3.jpg"
import Plug4 from "../../img/plug4.jpg"
import Plug5 from "../../img/plug5.jpg"

// вся магия будет тут походу
export function Articles__Article () {
    return (
        <article className="article">
                <div className="article__header ">
                    <div className="article__date">22:28 01.01.0000 <span
                        className="article__date article__date&#45;&#45;update">(updated 22:30 01.01.0000)</span>
                    </div>
                    <div className="article__title-main">Plug. Frenzied refrigerators are massively attacking cute
                        kittens.
                    </div>
                    <h1 className="article__title-second">A wedding is a funeral with a cake.</h1>
                    <div className="article__photo">
                        <img src={ Plug1 } alt="Plug1" className="article__photo-img"/>
                        <span className="article__photo-text">Just do it!</span>
                    </div>
                </div>
                <div className="article__body">
                    The contents of this block will be generated using frameworks. Therefore, let's give free rein
                    to imagination.
                    Rabid penguins attacked the Titanic, bit the commander of the ship and stole the radio. A group
                    of strangers met other strangers.
                    The mobile version of the safe harbor has lost a finger. I'm not Zura, I'm Katsura. A blue squid
                    bit my dog's gills.
                    <img className="img-fluid" src={ Plug2 } alt="plug"/>
                    Mario, your princess is in another castle. After each step, make a jump. If you see a red
                    ray, look for a rainbow.
                    Every third person will become the fifth. If you love a table, love a chair. I'll be back.
                    Sasuke, go back to the village.
                    <img className="img-fluid" src={ Plug3 } alt="plug"/>
                    If the yellow guitar becomes the sun, the dinosaurs will take over Sweden. Why are you
                    going after a frog? It's not yours.
                    If you report an error, the error will be fixed. But not with this package.
                    <img className="img-fluid" src={ Plug4 } alt="plug"/>
                    He said that light is a wave, and he will go to watch music. Next year will be right
                    after that.
                    <img className="img-fluid" src={ Plug5 } alt="plug"/>
                    A samurai with a sword is like a samurai without a sword, but only with a sword.
                    The horse will not become a gopher,
                    but the gopher will become a cat.
                </div>
            </article>
    )
}