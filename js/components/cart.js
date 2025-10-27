import { fetchProducts } from "./api.js";

export default class Cart {
  constructor() {
    this.items = [];
    this.loadFromLocalStorage();
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.product-card__link.btn--icon')) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        if (!productCard) return;

        const productId = productCard.dataset.id;
        if (!productId) {
          console.error('У товара отсутствует ID!');
          return;
        }

        fetchProducts().then(products => {
          const product = products.find(p => p.id == productId);
          if (product) {
            this.addProduct({
              id: product.id,
              name: product.name,
              price: product.price.new,
              img: product.image
            });
          }
        });
      }

      if (e.target.closest('.basket__item-close')) {
        e.preventDefault();
        const itemId = e.target.closest('.basket__item-close').dataset.id;
        this.removeItem(itemId);
      }
    });
  }

  removeItem(itemId) {
    itemId = parseInt(itemId);
    const itemIndex = this.items.findIndex(item => item.id === itemId);

    this.items.splice(itemIndex, 1);
    this.saveToLocalStorage();
    this.updateUI();
  }

  addProduct(productData) {
    const existingItem = this.items.find(item => item.id === productData.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        img: productData.img,
        quantity: 1
      });
    }

    this.saveToLocalStorage();
    this.updateUI();
  }

  updateUI() {
    const cartCount = document.querySelector('.header__user-count');
    const basketList = document.querySelector('.basket__list');
    const emptyBlock = document.querySelector('.basket__empty-block');
    const checkoutLink = document.querySelector('.basket__link');

    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    basketList.innerHTML = '';

    if (this.items.length > 0) {
      emptyBlock.style.display = 'none';
      if (checkoutLink) checkoutLink.style.display = 'block';

      this.items.forEach(item => {
        const cartItemHTML = `
                  <li class="basket__item">
                      <div class="basket__img">
                          <img src="${item.img}" alt="${item.name}" width="60" height="60">
                      </div>
                      <span class="basket__name">${item.name}</span>
                      <span class="basket__price">${item.price.toLocaleString()} ₽ × ${item.quantity}</span>
                      <button class="basket__item-close" type="button" data-id="${item.id}">
                          <svg width="24" height="24" aria-hidden="true">
                              <use xlink:href="images/sprite.svg#icon-close"></use>
                          </svg>
                      </button>
                  </li>
              `;
        basketList.insertAdjacentHTML('beforeend', cartItemHTML);
      });
    } else {
      emptyBlock.style.display = 'block';
      if (checkoutLink) checkoutLink.style.display = 'none';
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
      this.updateUI();
    }
  }
}