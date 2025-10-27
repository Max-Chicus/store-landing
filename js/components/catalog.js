import { fetchProducts } from './api.js';
import { createProductCard, initTooltips } from './product-card.js';
import { countProductsByType } from './product-counter.js';
import initFilters from './filters.js';
import { filterProducts } from './product-filter.js';
import { initPagination } from './pagination.js';

const pagination = initPagination(renderProductList);

export async function renderProducts(filters = {}, sortType = '') {
    const products = await fetchProducts();
    const validProducts = products.filter(product => product);

    updateTypeCounters(validProducts);

    let filteredProducts = filterProducts(validProducts, filters);

    filteredProducts = sortProducts(filteredProducts, sortType);

    pagination.updatePagination(filteredProducts);
}

export function sortProducts(products, sortType) {
    const sortedProducts = [...products];
    
    switch (sortType) {
        case 'price-min':
            return sortedProducts.sort((a, b) => (a.price.new || 0) - (b.price.new || 0));
        case 'price-max':
            return sortedProducts.sort((a, b) => (b.price.new || 0) - (a.price.new || 0));
        case 'rating-max':
            return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        default:
            return sortedProducts;
    }
}

function updateTypeCounters(products) {
    const typeCounts = countProductsByType(products);
    Object.keys(typeCounts).forEach(type => {
        const counter = document.querySelector(`.custom-checkbox--${type} .custom-checkbox__count`);
        if (counter) counter.textContent = typeCounts[type];
    });
}

export function renderProductList(products) {
    const catalogList = document.querySelector('.catalog__list');
    if (catalogList) {
        catalogList.innerHTML = products.map(createProductCard).join('');
        initTooltips();
    }
}

export default function initCatalog() {
    const filters = initFilters((filters) => {
        const sortSelect = document.querySelector('.catalog__sort-select');
        const sortType = sortSelect ? sortSelect.value : '';
        renderProducts(filters, sortType);
    });

    const sortSelect = document.querySelector('.catalog__sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderProducts(filters.getCurrentFilters(), sortSelect.value);
        });
    }

    renderProducts(filters.getCurrentFilters());
}