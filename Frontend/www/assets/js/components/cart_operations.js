import { createElement } from '../helpers/dom_helpers.js';
import { saveToLocalStorage } from '../helpers/storage_helpers.js';

class Pizza {
    constructor(name, large, quantity, price, image, weight) {
        this.name = name;
        this.large = large;
        this.quantity = quantity;
        this.price = price;
        this.image = image;
        this.weight = weight;
    }
}

let pizzaOrdered = [];
let totalPizzas = document.querySelector(".cart .cart-title span span");
let totalSum = document.querySelector(".cart .buy-section .sum");

export function addToCart(item, isLarge, fromLocalStorage = false) {
    const pizzaName = item.name + (isLarge ? " (Велика)" : " (Мала)");
    const price = isLarge ? item.bigSize.price : item.smallSize.price;

    let existingPizza = pizzaOrdered.find(pizza => pizza.name === item.name && pizza.large === isLarge);
    if (existingPizza) {
        existingPizza.quantity++;
    } else {
        const newPizza = new Pizza(item.name, isLarge, 1, price, item.icon, isLarge ? item.bigSize.weight : item.smallSize.weight);
        pizzaOrdered.push(newPizza);
    }

    if (!fromLocalStorage) {
        renderCart();
        saveToLocalStorage(pizzaOrdered);
    }
    updateTotals(price);
}

export function renderCart() {
    const orderList = document.querySelector(".order-list");
    orderList.innerHTML = '';
    pizzaOrdered.forEach(pizza => {
        const orderItem = createOrderItem(pizza);
        orderList.appendChild(orderItem);
    });
}

function createOrderItem(pizza) {
    const orderItem = createElement('div', 'ordered-item');
    const name = pizza.name + (pizza.large ? " (Велика)" : " (Мала)");

    orderItem.innerHTML = `
        <div class="details">
            <span class="pizza-name">${name}</span>
            <div class="order-info">
                <div class="size">
                    <img src="assets/images/size-icon.svg"/><span>${pizza.large ? 40 : 30}</span>
                </div>
                <div class="weight">
                    <img src="assets/images/weight.svg"/><span>${pizza.weight}</span>
                </div>
            </div>
            <form class="control-panel">
                <span>${pizza.price}грн</span>
                <div class="amount-control">
                    <button type="button" class="minus ${pizza.quantity === 1 ? 'disabled' : ''}" onclick="reduceQuantity('${name}')">-</button>
                    <span class="amount">${pizza.quantity}</span>
                    <button type="button" class="plus" onclick="increaseQuantity('${name}')">+</button>
                </div>
                <button type="button" class="delete" onclick="removeItem('${name}')">x</button>
            </form>
        </div>
        <div class="order-picture">
            <img src=${pizza.image}>
        </div>`;
    return orderItem;
}

function updateTotals(price) {
    totalPizzas.textContent = parseInt(totalPizzas.textContent) + 1;
    totalSum.textContent = (parseInt(totalSum.textContent.split(" ")[0]) + parseInt(price)) + "грн";
}

export function increaseQuantity(name) {
    const pizza = pizzaOrdered.find(p => p.name + (p.large ? " (Велика)" : " (Мала)") === name);
    if (pizza) {
        pizza.quantity++;
        renderCart();
        saveToLocalStorage(pizzaOrdered);
        updateTotals(pizza.price);
    }
}

export function reduceQuantity(name) {
    const pizza = pizzaOrdered.find(p => p.name + (p.large ? " (Велика)" : " (Мала)") === name);
    if (pizza && pizza.quantity > 1) {
        pizza.quantity--;
        renderCart();
        saveToLocalStorage(pizzaOrdered);
        updateTotals(-pizza.price);
    }
}

export function removeItem(name) {
    const pizzaIndex = pizzaOrdered.findIndex(p => p.name + (p.large ? " (Велика)" : " (Мала)") === name);
    if (pizzaIndex > -1) {
        const pizza = pizzaOrdered[pizzaIndex];
        updateTotals(-pizza.price * pizza.quantity);
        pizzaOrdered.splice(pizzaIndex, 1);
        renderCart();
        saveToLocalStorage(pizzaOrdered);
    }
}

export function clearOrders() {
    pizzaOrdered = [];
    renderCart();
    totalPizzas.textContent = 0;
    totalSum.textContent = "0 грн";
    saveToLocalStorage(pizzaOrdered);
}
