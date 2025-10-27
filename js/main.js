import catalogOpenClose from "./components/burger.js";
import initLocation from "./components/location.js";
import initCatalog from './components/catalog.js';
import basketOpenClose from "./components/basket.js";
import Cart from "./components/cart.js";
import Accordion from "./components/accordion.js";
import { initDayProductsSlider } from "./components/slider.js";
import { initContactForm } from "./components/form-validation.js";

document.addEventListener('DOMContentLoaded', async () => {
    initLocation();
    initCatalog();
    catalogOpenClose();
    basketOpenClose();
    const cart = new Cart();
    new Accordion('.faq__accordion')
    initDayProductsSlider();
    initContactForm();
});