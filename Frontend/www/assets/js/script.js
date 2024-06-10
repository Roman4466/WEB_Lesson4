document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/js/data/pizza_info.json")
    .then(response => response.json())
    .then(data => {
        initializePizzaList(data);
    });
});


function initializePizzaList(pizzaInfo) {
    const productsContainer = document.querySelector('.list');
    
    pizzaInfo.forEach(pizza => {
        const pizzaItem = createPizzaItem(pizza);
        productsContainer.appendChild(pizzaItem);
    });

    addEventListeners();
}

function createPizzaItem(pizza) {
    const pizzaItem = document.createElement('div');
    pizzaItem.classList.add('pizza-item');
    pizzaItem.setAttribute("type", pizza.type);
    
    if (pizza.content.pineapple) {
        pizzaItem.setAttribute("add-ons", "pineapple");
    }
    
    if (pizza.content.mushroom) {
        pizzaItem.setAttribute("add-ons", "mushrooms");
    }
    
    const singleSizeClass = (pizza.small_size && pizza.big_size) ? "" : "single";
    pizzaItem.innerHTML = `
        <div class="thumbnail">
            ${createBadge(pizza)}
            <img src="${pizza.icon}" alt="pizza-image">
            <div class="information">
                <span class="name">${pizza.title}</span>
                <span class="pizza-type">${getPizzaType(pizza.type)}</span>
                <span class="ingredients">${getIngredients(pizza.content)}</span>
                <div class="size-info ${singleSizeClass}">
                    ${createSizeInfo(pizza.small_size, "small")}
                    ${createSizeInfo(pizza.big_size, "large")}
                </div>
            </div>
        </div>
    `;
    return pizzaItem;
}

function getPizzaType(type) {
    switch (type) {
        case "meat":
            return "М'ясна піца";
        case "seafood":
            return "Піца з морепродуктами";
        case "vegan":
            return "Веганська піца";
        default:
            return "";
    }
}

function getIngredients(content) {
    return Object.values(content).flat().join(', ');
}

function createSizeInfo(size, sizeType) {
    if (!size) return "";
    
    return `
        <div class="size-${sizeType.charAt(0)}">
            <div class="size">
                <img src="assets/images/size-icon.svg"/><span>${size.size}</span>
            </div>
            <div class="weight">
                <img src="assets/images/weight.svg"/><span>${size.weight}</span>
            </div>
            <div class="price">
                <b>${size.price}</b> грн.
            </div>
            <button type="button" class="buy-${sizeType}">
                Купити
            </button>
        </div>
    `;
}

function createBadge(pizza) {
    if (pizza.is_new) {
        return '<div class="new">Нова</div>';
    }
    if (pizza.is_popular) {
        return '<div class="popular">Популярна</div>';
    }
    return '';
}

let total = document.querySelector(".cart .cart-title span span");
let total_sum = document.querySelector(".cart .buy-section .sum");
let all_pizzas = 8;

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

let pizza_ordered = [];

function addEventListeners() {
    document.querySelectorAll('.buy-small').forEach(button => {
        button.addEventListener('click', buyPizza.bind(null, false));
    });

    document.querySelectorAll('.buy-large').forEach(button => {
        button.addEventListener('click', buyPizza.bind(null, true));
    });
}

function buyPizza(isLarge, event) {
    const item = event.target.closest(".thumbnail");
    const name = item.querySelector(".name").textContent.trim();
    const priceElement = item.querySelector(isLarge ? ".size-l .price b" : ".size-s .price b");
    const price = parseInt(priceElement.textContent);
    const sizeType = isLarge ? " (Велика)" : " (Мала)";
    const fullName = name + sizeType;

    let existingPizza = pizza_ordered.find(pizza => pizza.name === name && pizza.large === isLarge);
    
    if (existingPizza) {
        existingPizza.quantity++;
        updateOrderUI(fullName, price, 1);
    } else {
        const weight = item.querySelector(isLarge ? ".size-l .weight span" : ".size-s .weight span").textContent;
        const image = item.querySelector("img").getAttribute('src');
        const newPizza = new Pizza(name, isLarge, 1, price, image, weight);
        pizza_ordered.push(newPizza);
        addNewOrderUI(newPizza, fullName);
    }

    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
}

function updateOrderUI(name, price, quantityChange) {
    document.querySelectorAll(".ordered-item").forEach(order => {
        if (order.querySelector(".pizza-name").textContent.trim() === name.trim()) {
            const quantityElement = order.querySelector(".amount");
            const currentQuantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQuantity + quantityChange;
            total.textContent = parseInt(total.textContent) + quantityChange;
            total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + (price * quantityChange)) + "грн";

            if (currentQuantity + quantityChange > 1) {
                order.querySelector(".minus").classList.remove('disabled');
            }
        }
    });
}

function addNewOrderUI(pizza, fullName) {
    const newOrder = document.createElement('div');
    newOrder.classList.add("ordered-item");
    newOrder.innerHTML = `
        <div class="details">
            <span class="pizza-name">${fullName}</span>
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
                    <button type="button" class="minus disabled" onclick="changeQuantity(event, -1)">
                        -
                    </button>
                    <span class="amount">1</span>
                    <button type="button" class="plus" onclick="changeQuantity(event, 1)">
                        +
                    </button>
                </div>
                <button type="button" class="delete" onclick="removePizza(event)">
                    x
                </button>
            </form>
        </div>
        <div class="order-picture">
            <img src=${pizza.image}>
        </div>
    `;
    document.querySelector(".order-list").appendChild(newOrder);
    total.textContent = parseInt(total.textContent) + 1;
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + pizza.price) + "грн";
}

function changeQuantity(event, change) {
    const order = event.target.closest(".ordered-item");
    const quantityElement = order.querySelector(".amount");
    const currentQuantity = parseInt(quantityElement.textContent);
    const name = order.querySelector(".pizza-name").textContent.trim();
    const price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3));

    if (currentQuantity + change > 0) {
        quantityElement.textContent = currentQuantity + change;
        total.textContent = parseInt(total.textContent) + change;
        total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + (price * change)) + "грн";

        const pizza = pizza_ordered.find(pizza => (pizza.name + (pizza.large ? " (Велика)" : " (Мала)")) === name);
        pizza.quantity += change;

        if (currentQuantity + change === 1) {
            order.querySelector(".minus").classList.add('disabled');
        } else {
            order.querySelector(".minus").classList.remove('disabled');
        }

        localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
    }
}

function removePizza(event) {
    const order = event.target.closest(".ordered-item");
    const name = order.querySelector(".pizza-name").textContent.trim();
    const quantity = parseInt(order.querySelector(".amount").textContent);
    const price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3));

    pizza_ordered = pizza_ordered.filter(pizza => (pizza.name + (pizza.large ? " (Велика)" : " (Мала)")) !== name);

    total.textContent = parseInt(total.textContent) - quantity;
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) - (price * quantity)) + "грн";

    order.remove();
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
}

function downloadLocal() {
    pizza_ordered = JSON.parse(localStorage.getItem('pizzaList'));
    let disabled;
    let name;
    let quantity;
    let weight;
    let img;
    let price;
    let new_order;
    let size;
    let total_ordered = 0;
    let total_price = 0;
    let list = JSON.parse(localStorage.getItem('pizzaList'));
    for (let item of list) {
        total_ordered += parseInt(item.quantity);
        total_price += parseInt(item.quantity) * parseInt(item.price);
        name = item.name;
        if (item.large) {
            name += " (Велика)";
            size = 40;
        } else {
            name += " (Мала)";
            size = 30;
        }
        disabled = parseInt(item.quantity) === 1 ? "disabled" : "";
        weight = item.weight;
        quantity = item.quantity;
        price = item.price;
        img = item.image;
        new_order = document.createElement('div');
        new_order.classList.add("ordered-item");
        new_order.innerHTML = `<div class="details">
            <span class="pizza-name">${name}</span>
            <div class="order-info">
                <div class="size">
                    <img src="assets/images/size-icon.svg"/><span>${size}</span>
                </div>
                <div class="weight">
                    <img src="assets/images/weight.svg"/><span>${weight}</span>
                </div>
            </div>
            <form class="control-panel">
                <span>${price}грн</span>
                <div class="amount-control">
                    <button type="button" class="minus ${disabled}" onclick="reduce(event)">
                        -
                    </button>
                    <span class="amount">${quantity}</span>
                    <button type="button" class="plus" onclick="increase(event)">
                        +
                    </button>
                </div>
                <button type="button" class="delete" onclick="remove(event)">
                        x
                </button>
            </form>
            </div>
            <div class="order-picture">
                <img src=${img}>
            </div>
        </div>`;
        document.querySelector(".order-list").appendChild(new_order);
    }
    total.textContent = total_ordered;
    total_sum.textContent = total_price + "грн";
}

if (localStorage.getItem("pizzaList") !== null) {
    downloadLocal();
}

function increase(event) {
    let order = event.target.closest(".ordered-item");
    let quantity = order.querySelector(".amount");
    let name;
    let size;
    if (order.querySelector(".pizza-name").textContent.split(" ").length === 2) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0];
        size = order.querySelector(".pizza-name").textContent.split(" ")[1];
    }
    if (order.querySelector(".pizza-name").textContent.split(" ").length === 3) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0] + " " + order.querySelector(".pizza-name").textContent.split(" ")[1];
        size = order.querySelector(".pizza-name").textContent.split(" ")[2];
    }
    for (let pizza of pizza_ordered) {
        if (pizza.name === name && ((pizza.large && size === "(Велика)") || (!pizza.large && size === "(Мала)"))) {
            pizza.quantity++;
        }
    }
    let amount = parseInt(quantity.textContent);
    quantity.textContent = amount + 1;
    total.textContent = parseInt(total.textContent) + 1;
    order.querySelector(".minus").classList.remove('disabled');
    let price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3));
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + price) + "грн";
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
}

function reduce(event) {
    let order = event.target.closest(".ordered-item");
    let quantity = order.querySelector(".amount");
    let amount = parseInt(quantity.textContent);
    let name;
    let size;
    if (order.querySelector(".pizza-name").textContent.split(" ").length === 2) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0];
        size = order.querySelector(".pizza-name").textContent.split(" ")[1];
    }
    if (order.querySelector(".pizza-name").textContent.split(" ").length === 3) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0] + " " + order.querySelector(".pizza-name").textContent.split(" ")[1];
        size = order.querySelector(".pizza-name").textContent.split(" ")[2];
    }
    for (let pizza of pizza_ordered) {
        if (pizza.name === name && ((pizza.large && size === "(Велика)") || (!pizza.large && size === "(Мала)"))) {
            pizza.quantity--;
            break;
        }
    }
    quantity.textContent = amount - 1;
    total.textContent = parseInt(total.textContent) - 1;
    if (quantity.textContent == 1) {
        order.querySelector(".minus").classList.add('disabled');
    }
    let price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3));
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) - price) + "грн";
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
}

function remove(event) {
    let order = event.target.closest(".ordered-item");
    let quantity = order.querySelector(".amount").textContent;
    let name;
    let size;
    if (order.querySelector(".pizza-name").textContent.split(" ").length === 2) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0];
        size = order.querySelector(".pizza-name").textContent.split(" ")[1];
    }
    if (order.querySelector(".pizza-name").textContent.split(" ").length === 3) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0] + " " + order.querySelector(".pizza-name").textContent.split(" ")[1];
        size = order.querySelector(".pizza-name").textContent.split(" ")[2];
    }
    for (let pizza of pizza_ordered) {
        if (pizza.name === name && ((pizza.large && size === "(Велика)") || (!pizza.large && size === "(Мала)"))) {
            pizza_ordered = pizza_ordered.filter(item => item !== pizza);
            break;
        }
    }
    let price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3));
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) - price * parseInt(quantity)) + "грн";
    total.textContent = parseInt(total.textContent) - parseInt(quantity);
    order.remove();
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
}

function clear_orders() {
    let list = document.querySelector(".order-list");
    list.innerHTML = ``;
    pizza_ordered = [];
    total.textContent = 0;
    total_sum.textContent = "0 грн";
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
}

function filter_pizza(element) {
    for (let filter of document.querySelector(".filters").getElementsByTagName("span")) {
        filter.classList.remove("chosen");
    }
    element.classList.add("chosen");
    all_pizzas = 0;
    let filter = element.classList[0].trim();
    if (filter === 'meat' || filter === 'seafood' || filter === 'vegan') {
        for (let pizza of document.getElementsByClassName("pizza-item")) {
            pizza.style.display = "inline-block";
            if (pizza.getAttribute('type') !== filter) {
                pizza.style.display = "none";
            } else {
                all_pizzas += 1;
            }
        }
    } else if (filter === 'mushrooms' || filter === "pineapple") {
        for (let pizza of document.getElementsByClassName("pizza-item")) {
            pizza.style.display = "inline-block";
            if (pizza.getAttribute('add-ons') !== filter) {
                pizza.style.display = "none";
            } else {
                all_pizzas += 1;
            }
        }
    } else if (filter === 'all') {
        for (let pizza of document.getElementsByClassName("pizza-item")) {
            pizza.style.display = "inline-block";
            all_pizzas += 1;
        }
    }
    document.querySelector(".pizza-filters .pizzas-amount").textContent = all_pizzas;
}

function openLink() {
    window.location.href = "https://www.youtube.com/watch?v=TgQsIgX283Q";
}

initializePizzaList();
