import pizzaInfo from '../data/pizza_info.js';
import { createElement } from '../helpers/dom_helpers.js';

export function renderPizzas() {
    const products = document.querySelector('.list');
    pizzaInfo.forEach(pizza => {
        const pizzaItem = createPizzaItem(pizza);
        products.appendChild(pizzaItem);
    });
    updatePizzaCount();
}

function createPizzaItem(pizza) {
    const pizzaItem = createElement('div', 'pizza-item');
    pizzaItem.setAttribute('type', pizza.type);
    if (pizza.content.pineapple) pizzaItem.setAttribute('add-ons', 'pineapple');
    if (pizza.content.mushroom) pizzaItem.setAttribute('add-ons', 'mushrooms');

    const thumbnail = createElement('div', 'thumbnail');
    const img = createElement('img');
    img.src = pizza.icon;
    img.alt = "pizza-image";
    thumbnail.appendChild(img);

    const info = createElement('div', 'information');
    const name = createElement('span', 'name', { innerHTML: pizza.title });
    const type = createElement('span', 'pizza-type', { innerHTML: getType(pizza.type) });
    const ingredients = createElement('span', 'ingredients', { innerHTML: Object.values(pizza.content).flat().join(', ') });
    info.append(name, type, ingredients);

    const sizeInfo = createElement('div', 'size-info');
    if (pizza.smallSize) sizeInfo.appendChild(createSizeDiv(pizza.smallSize, false));
    if (pizza.bigSize) sizeInfo.appendChild(createSizeDiv(pizza.bigSize, true));

    info.appendChild(sizeInfo);
    thumbnail.appendChild(info);
    pizzaItem.appendChild(thumbnail);

    if (pizza.isNew) addBadge(pizzaItem, 'new', 'Нова');
    if (pizza.isPopular) addBadge(pizzaItem, 'popular', 'Популярна');

    return pizzaItem;
}

function createSizeDiv(size, isLarge) {
    const sizeDiv = createElement('div', isLarge ? 'size-l' : 'size-s');
    sizeDiv.innerHTML = `
        <div class="size">
            <img src="assets/images/size-icon.svg"/><span>${size.size}</span>
        </div>
        <div class="weight">
            <img src="assets/images/weight.svg"/><span>${size.weight}</span>
        </div>
        <div class="price">
            <b>${size.price}</b>
        </div>
        <span>грн.</span>
        <button type="button" onclick="${isLarge ? 'buyLarge()' : 'buySmall()'}">
            Купити
        </button>`;
    return sizeDiv;
}

function addBadge(element, className, text) {
    const badge = createElement('div', className, { innerHTML: text });
    element.appendChild(badge);
}

function getType(type) {
    switch (type) {
        case 'meat': return "М'ясна піца";
        case 'seafood': return "Піца з морепродуктами";
        case 'vegan': return "Веганська піца";
        default: return '';
    }
}
