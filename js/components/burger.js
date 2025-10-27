export default function catalogOpenClose() {
    const catalogBtn = document.querySelector('.header__catalog-btn');
    const catalogBtnClose = document.querySelector('.main-menu__close');
    const catalog = document.querySelector('.main-menu');

    catalogBtn.addEventListener('click', () => {
    catalog.classList.add('main-menu--active')
})

    catalogBtnClose.addEventListener('click', () => {
    catalog.classList.remove('main-menu--active')
})
}