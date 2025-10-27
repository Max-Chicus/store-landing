const PRODUCTS_PER_PAGE = 6;

export function initPagination(renderCallback) {
    let currentPage = 1;
    let totalPages = 1;
    let currentProducts = [];

    const paginationContainer = document.querySelector('.catalog__pagination');
    if (!paginationContainer) return;

    function updatePagination(products) {
        currentProducts = products;
        totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
        currentPage = 1; 
        
        renderPaginationControls();
        renderPage();
    }

    function renderPaginationControls() {
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="catalog__pagination-item">
                    <button class="catalog__pagination-link ${i === currentPage ? 'active' : ''}" 
                            data-page="${i}">${i}</button>
                </li>
            `;
        }

        paginationContainer.innerHTML = paginationHTML;

        document.querySelectorAll('.catalog__pagination-link').forEach(button => {
            button.addEventListener('click', () => {
                currentPage = parseInt(button.dataset.page);
                renderPage();
                updateActiveButton();
            });
        });
    }

    function updateActiveButton() {
        document.querySelectorAll('.catalog__pagination-link').forEach(button => {
            button.classList.toggle('active', parseInt(button.dataset.page) === currentPage);
        });
    }

    function renderPage() {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        const productsToShow = currentProducts.slice(startIndex, endIndex);
        
        renderCallback(productsToShow);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return {
        updatePagination
    };
}