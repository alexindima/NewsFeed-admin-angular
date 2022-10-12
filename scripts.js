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
        document.querySelector('.body-general').classList.add('modal-opened');
});

document.getElementById("modal_close").addEventListener('click', function () {
        document.querySelector('.modal_area').style.display = 'none';
        document.querySelector('.body-general').classList.remove('modal-opened');
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

/* Вынес для устранения повтора */
function SetBigHeader() {
    document.querySelector('.header').classList.remove('header_small');
    document.querySelector('.logo_img').classList.remove('logo_img_small');
}

function SetSmallHeader() {
    document.querySelector('.header').classList.add('header_small');
    document.querySelector('.logo_img').classList.add('logo_img_small');
}

function CalculateHeader() {
    if (scrollY  > downThreshold) {
        SetSmallHeader();
    }
    else { /* Гистерезис */
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

/* Считаем хедер и скролл-ап при скролле страницы и если ширина просмотра больше чем 768 */
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

/* Считаем хедер и скролл-ап при ресайзе браузера */
window.addEventListener('resize', function() {
    CalculateScrollAndHeader();
})

/* Считаем хедер и скролл-ап при загрузке страницы для маленького хедера при скукоженном экране */
window.addEventListener('DOMContentLoaded', function() {
    CalculateScrollAndHeader();
})

/* Две функции - клик на поле возврата к верху страницы / возврату к предыдущему месту */
arrowTop.addEventListener('click', function() {
    scrollWas = true
    lastPoint = scrollY ;
    window.scrollTo(scrollX , 0);
    arrowBottom.hidden = false;
    // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
})

arrowBottom.addEventListener('click', function () {
    window.scrollTo(scrollX , lastPoint);
})