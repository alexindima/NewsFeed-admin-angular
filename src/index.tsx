import * as React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./components/App"
import 'normalize.css';
import './index.scss';
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";


const app = document.getElementById("app")
const root = createRoot(app!); // createRoot(container!) if you use TypeScript
root.render(<App />);





/*

let scrollWas = false;
let lastPoint = 0;
const upThreshold = 500;
const downThreshold = 200;
const forgetThreshold = 2000;
const bigHeader = 50;

arrowTop = document.getElementById("arrowTop")
arrowBottom = document.getElementById("arrowBottom")

/!* Найти НАДЕЖНЫЙ способ скрывать попапы при клике вне их *!/

/!* Следующие четыре функции - открытие/закрытие попапов для иконок хедера *!/
document.getElementById("user").addEventListener('click', function () {

        document.querySelector('.modal-area').classList.remove('hidden');
        document.querySelector('.body-general').classList.add('modal-opened');
});

document.getElementById("modal-close").addEventListener('click', function () {
        document.querySelector('.modal-area').classList.add('hidden');
        document.querySelector('.body-general').classList.remove('modal-opened');
});

document.getElementById("search").addEventListener('click', function () {
    if (document.getElementById("search-window").classList.contains('hidden')) {
        document.getElementById("search-window").classList.remove('hidden');
    }
    else {
        document.getElementById("search-window").classList.add('hidden');
    }
});

document.getElementById("dropdown").addEventListener('click', function () {
    if (document.getElementById("category-window").classList.contains('hidden')) {
        document.getElementById("category-window").classList.remove('hidden');
    }
    else {
        document.getElementById("category-window").classList.add('hidden');
    }
});

/!* Отслеживание скролла для изменения высоты хедера и появления поля возврата к верху страницы *!/

/!* Вынес для устранения повтора *!/
function SetBigHeader() {
    document.querySelector('.header').classList.remove('header--small');
    document.querySelector('.header__logo-img').classList.remove('header__logo-img--small');
}

function SetSmallHeader() {
    document.querySelector('.header').classList.add('header--small');
    document.querySelector('.header__logo-img').classList.add('header__logo-img--small');
}

function CalculateHeader() {
    if (scrollY  > downThreshold) {
        SetSmallHeader();
    }
    else { /!* Гистерезис *!/
        if (scrollY  < bigHeader) {
            SetBigHeader();
        }
    }
}

function CalculateScroll() {
    arrowTop.hidden = (scrollY  < upThreshold);
    if (scrollY  > forgetThreshold) {
        scrollWas = false;
    }
    arrowBottom.hidden = !((scrollWas) && (scrollY < bigHeader));
}

function CalculateScrollAndHeader() {
    let scrollWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );
    if (scrollWidth > 768) {
        CalculateScroll();
        CalculateHeader();
    }
    else {
        SetSmallHeader();
    }
}

/!* Считаем хедер и скролл-ап при скролле страницы и если ширина просмотра больше чем 768 *!/
window.addEventListener('scroll', function() {
    let scrollWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );
    if (scrollWidth > 768) {
        CalculateScroll();
        CalculateHeader();
    }
})

/!* Считаем хедер и скролл-ап при ресайзе браузера *!/
window.addEventListener('resize', function() {
    CalculateScrollAndHeader();
})

/!* Считаем хедер и скролл-ап при загрузке страницы для маленького хедера при скукоженном экране *!/
window.addEventListener('DOMContentLoaded', function() {
    CalculateScrollAndHeader();
})

/!* Две функции - клик на поле возврата к верху страницы / возврату к предыдущему месту *!/
arrowTop.addEventListener('click', function() {
    scrollWas = true
    lastPoint = scrollY ;
    window.scrollTo(scrollX , 0);
    arrowBottom.hidden = false;
    // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
})

arrowBottom.addEventListener('click', function () {
    window.scrollTo(scrollX , lastPoint);
})*/
