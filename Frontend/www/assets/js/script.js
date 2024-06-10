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

function addEventListeners() {
    document.querySelectorAll('.buy-small').forEach(button => {
        button.addEventListener('click', buy_small);
    });

    document.querySelectorAll('.buy-large').forEach(button => {
        button.addEventListener('click', buy_large);
    });
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

function buy_large(event) {
    let item = event.target.closest(".thumbnail");
    let name = item.querySelector(".name").textContent.trim();
    let large_name = name + " (Велика)";
    let price = item.querySelector(".size-l").querySelector(".price").querySelector('b').textContent;
    for (let pizza of pizza_ordered) {
        if (pizza.name === name && pizza.large) {
            pizza.quantity++;
            for (let order of document.querySelector(".order-list").getElementsByClassName("ordered-item")) {
                if (order.querySelector(".pizza-name").textContent == large_name.trim()) {
                    let quantity = order.querySelector(".amount");
                    let amount = parseInt(quantity.textContent);
                    quantity.textContent = amount + 1;
                    total.textContent = parseInt(total.textContent) + 1;
                    order.querySelector(".minus").classList.remove('disabled');
                    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн";
                    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
                    return;
                }
            }
        }
    }
    let weight = item.querySelector(".size-l").querySelector(".weight").querySelector('span').textContent;
    let new_order = document.createElement('div');
    let image = item.querySelector("img").getAttribute('src');
    new_order.classList.add("ordered-item");
    pizza_ordered.push(new Pizza(name, true, 1, price, image, weight));
    new_order.innerHTML = `<div class="details">
            <span class="pizza-name">${name} (Велика)</span>
            <div class="order-info">
                <div class="size">
                    <img src="assets/images/size-icon.svg"/><span>40</span>
                </div>
                <div class="weight">
                    <img src="assets/images/weight.svg"/><span>${weight}</span>
                </div>
            </div>
            <form class="control-panel">
                <span>${price}грн</span>
                <div class="amount-control">
                    <button type="button" class="minus disabled" onclick="reduce(event)">
                        -
                    </button>
                    <span class="amount">1</span>
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
                <img src=${image}>
            </div>
        </div>`;
    document.querySelector(".order-list").appendChild(new_order);
    total.textContent = parseInt(total.textContent) + 1;
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн";
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
}

function buy_small(event) {
    let item = event.target.closest(".thumbnail");
    let name = item.querySelector(".name").textContent.trim();
    let large_name = name + " (Мала)";
    let price = item.querySelector(".size-s").querySelector(".price").querySelector('b').textContent;
    for (let pizza of pizza_ordered) {
        if (pizza.name === name && !pizza.large) {
            pizza.quantity++;
            for (let order of document.querySelector(".order-list").getElementsByClassName("ordered-item")) {
                if (order.querySelector(".pizza-name").textContent == large_name.trim()) {
                    let quantity = order.querySelector(".amount");
                    let amount = parseInt(quantity.textContent);
                    quantity.textContent = amount + 1;
                    total.textContent = parseInt(total.textContent) + 1;
                    order.querySelector(".minus").classList.remove('disabled');
                    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн";
                    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered));
                    return;
                }
            }
        }
    }
    let weight = item.querySelector(".size-s").querySelector(".weight").querySelector('span').textContent;
    let new_order = document.createElement('div');
    let image = item.querySelector("img").getAttribute('src');
    pizza_ordered.push(new Pizza(name, false, 1, price, image, weight));
    new_order.classList.add("ordered-item");
    new_order.innerHTML = `<div class="details">
            <span class="pizza-name">${name} (Мала)</span>
            <div class="order-info">
                <div class="size">
                    <img src="assets/images/size-icon.svg"/><span>30</span>
                </div>
                <div class="weight">
                    <img src="assets/images/weight.svg"/><span>${weight}</span>
                </div>
            </div>
            <form class="control-panel">
                <span>${price}грн</span>
                <div class="amount-control">
                    <button type="button" class="minus disabled" onclick="reduce(event)">
                        -
                    </button>
                    <span class="amount">1</span>
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
                <img src=${image}>
            </div>
        </div>`;
    document.querySelector(".order-list").appendChild(new_order);
    total.textContent = parseInt(total.textContent) + 1;
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн";
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
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with the URL you want to open
}

initializePizzaList();
