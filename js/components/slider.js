import { fetchProducts } from './api.js';
import { createProductCard } from './product-card.js';

export const initDayProductsSlider = async () => {
  try {
    const productsData = await fetchProducts();
    
    if (productsData.length === 0) {
      throw new Error('Нет данных о товарах');
    }

    const dayProducts = productsData.filter(product => product.goodsOfDay === true);
    
    if (dayProducts.length === 0) {
      console.warn('Нет товаров дня для отображения');
      return;
    }

    const sliderContainer = document.querySelector('.day-products__list');
    const prevBtn = document.querySelector('.day-products__navigation-btn--prev');
    const nextBtn = document.querySelector('.day-products__navigation-btn--next');
    
    sliderContainer.innerHTML = '';
    
    dayProducts.forEach(product => {
      const slide = document.createElement('li');
      slide.className = 'day-products__item swiper-slide';
      slide.innerHTML = createProductCard(product, 'small');
      sliderContainer.appendChild(slide);
    });
    
    const swiper = new Swiper('.day-products__slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        576: { slidesPerView: 2, spaceBetween: 15 },
        992: { slidesPerView: 3, spaceBetween: 20 },
        1200: { slidesPerView: 4, spaceBetween: 20 }
      }
    });

    const updateButtons = () => {
      prevBtn.disabled = swiper.isBeginning;
      nextBtn.disabled = swiper.isEnd;
      prevBtn.classList.toggle('disabled', swiper.isBeginning);
      nextBtn.classList.toggle('disabled', swiper.isEnd);
    };

    swiper.on('init', updateButtons);
    swiper.on('slideChange', updateButtons);
    swiper.init();

  } catch (error) {
    console.error('Ошибка инициализации слайдера:', error);
    showErrorMessage();
  }
};

function showErrorMessage() {
  const sliderSection = document.querySelector('.day-products');
  if (!sliderSection) return;
  
  const errorElement = document.createElement('div');
  errorElement.className = 'day-products__error';
  errorElement.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2z"/>
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
    <p>Не удалось загрузить товары дня</p>
  `;
  
  sliderSection.appendChild(errorElement);
}