export async function fetchProducts() {
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        return [];
    }
}