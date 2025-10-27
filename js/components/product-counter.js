export function countProductsByType(products) {
    const counts = {
        pendant: 0,
        ceiling: 0,
        overhead: 0,
        point: 0,
        nightlights: 0
    };

    products.forEach(product => {
        product.type?.forEach(type => {
            if (counts.hasOwnProperty(type)) {
                counts[type]++;
            }
        });
    });

    return counts;
}