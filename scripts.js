let scrollWas = false;
let lastPoint = 0;
const upThreshold = 500;
const downThreshold = 200;
const forgetThreshold = 2000;
const bigHeader = 50;

arrowTop = document.getElementById("arrowTop")
arrowBottom = document.getElementById("arrowBottom")

/* Найти способ скрывать попапы при клике вне их */

/* Следующие четыре функции - открытие/закрытие попапов для иконок хедера */
document.getElementById("user").addEventListener('click', function () {

        document.querySelector('.modal_area').style.display = 'flex';
        document.querySelector('.wrapper').classList.add('modal-opened');
});

document.getElementById("modal_close").addEventListener('click', function () {
        document.querySelector('.modal_area').style.display = 'none';
        document.querySelector('.wrapper').classList.remove('modal-opened');
});

document.getElementById("search").addEventListener('click', function () {
    if (document.querySelector('.search').style.display === 'block') {
        document.querySelector('.search').style.display = 'none';
    }
    else {
        document.querySelector('.search').style.display = 'block';
    }
});

document.getElementById("dropdown").addEventListener('click', function () {
    if (document.querySelector('.dropdown').style.display === 'block') {
        document.querySelector('.dropdown').style.display = 'none';
    }
    else {
        document.querySelector('.dropdown').style.display = 'block';
    }
});

/* Отслеживание скролла для изменения высоты хедера и появления поля возврата к верху страницы */
window.addEventListener('scroll', function() {
    document.querySelector('.scroll-button').style.top = document.querySelector('.header').style.height + "px";
    arrowTop.hidden = (pageYOffset < upThreshold);
    if (pageYOffset > forgetThreshold) {
        scrollWas = false;
    }
    if ((scrollWas == true) && (pageYOffset < bigHeader)) {
        arrowBottom.hidden = false;
    }
    else {
        arrowBottom.hidden = true;
    }
    if (pageYOffset > downThreshold) {
        document.querySelector('.header').classList.add('header_small');
        document.querySelector('.logo_img').classList.add('logo_img_small');
    }
    else {
        if (pageYOffset < bigHeader) {
            document.querySelector('.header').classList.remove('header_small');
            document.querySelector('.logo_img').classList.remove('logo_img_small');
        }
    }
});

/* Две функции - клик на поле возврата к верху страницы / возврату к предыдущему месту */
arrowTop.addEventListener('click', function() {
    scrollWas = true
    lastPoint = pageYOffset;
    window.scrollTo(pageXOffset, 0);
    arrowBottom.hidden = false;
    // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
});

arrowBottom.addEventListener('click', function () {
    window.scrollTo(pageXOffset, lastPoint);
});