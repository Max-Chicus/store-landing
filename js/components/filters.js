export default function initFilters(renderCallback) {
    const inStockRadio = document.getElementById('instock');
    const allItemsRadio = document.getElementById('all-item');
    const typeCheckboxes = document.querySelectorAll('[name="type"]');
    const catalogForm = document.querySelector('.catalog-form');

    let currentFilters = {
        instock: false,
        types: []
    };

    const updateFilters = () => {
        renderCallback(currentFilters);
    };

    inStockRadio?.addEventListener('change', (e) => {
        currentFilters.instock = e.target.checked;
        updateFilters();
    });

    allItemsRadio?.addEventListener('change', (e) => {
        currentFilters.instock = false;
        updateFilters();
    });

    typeCheckboxes?.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.types.push(e.target.value);
            } else {
                currentFilters.types = currentFilters.types.filter(type => type !== e.target.value);
            }
            updateFilters();
        });
    });

    catalogForm?.addEventListener('reset', () => {
        currentFilters = {
            instock: false,
            types: []
        };
        updateFilters();
    });

    document.addEventListener('cityChanged', (e) => {
        currentFilters.city = e.detail;
        updateFilters();
    });

    return {
        getCurrentFilters: () => currentFilters
    };
}