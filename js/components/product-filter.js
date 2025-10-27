export function filterProducts(products, filters) {
    return products.filter(product => {
        if (filters.instock && !isProductInStock(product)) {
            return false;
        }

        if (filters.types?.length > 0 && !hasMatchingType(product, filters.types)) {
            return false;
        }

        if (filters.city && !isProductAvailableInCity(product, filters.city)) {
            return false;
        }

        return true;
    });
}

function isProductInStock(product) {
    return Object.values(product.availability).some(count => count > 0);
}

function hasMatchingType(product, selectedTypes) {
    return product.type.some(type => selectedTypes.includes(type));
}

function isProductAvailableInCity(product, cityName) {
    const cityKey = getCityKey(cityName);
    return product.availability[cityKey] > 0;
}

function getCityKey(cityName) {
    const cityMap = {
        'Москва': 'moscow',
        'Оренбург': 'orenburg',
        'Санкт-Петербург': 'saintPetersburg'
    };
    return cityMap[cityName] || '';
}