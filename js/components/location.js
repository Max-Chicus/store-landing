export default function initLocation() {
    const locationBtnEl = document.querySelector('.location__city');
    const cityNameEl = document.querySelector('.location__city-name');
    const locationSublink = document.querySelectorAll('.location__sublink');

    if (!locationBtnEl || !cityNameEl || !locationSublink) return;

    const handleCityChange = (city) => {
        cityNameEl.textContent = city;
        locationBtnEl.classList.remove('location__city--active');
        return city;
    };

    locationBtnEl.addEventListener('click', () => {
        locationBtnEl.classList.toggle('location__city--active');
    });

    locationSublink.forEach(element => {
        element.addEventListener('click', () => {
            const selectedCity = handleCityChange(element.textContent);
            cityNameEl.textContent = selectedCity;
            locationBtnEl.classList.remove('location__city--active');
            
            document.dispatchEvent(new CustomEvent('cityChanged', { 
                detail: selectedCity 
            }));
        });
    });

    return {
        getCurrentCity: () => cityNameEl.textContent
    };
}