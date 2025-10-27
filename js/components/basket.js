export default function basketOpenClose() {
    const basketOpenCloseBtnEl = document.querySelector('.header__user-btn');
    const headerBasketEl = document.querySelector('.header__basket');

    basketOpenCloseBtnEl.addEventListener('click', () => {
        headerBasketEl.classList.toggle('basket--active')
    })
}