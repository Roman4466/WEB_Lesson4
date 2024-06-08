var pizza_info = [
    {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'meat',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,
        is_popular:true

    },
    {
        id:2,
        icon:'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'meat',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id:3,
        icon:'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'meat',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id:4,
        icon:'assets/images/pizza_5.jpg',
        title: "Сициліано",
        type: 'meat',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id:17,
        icon:'assets/images/pizza_3.jpg',
        title: "Маргарита",
        type: 'vegan',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id:43,
        icon:'assets/images/pizza_6.jpg',
        title: "Мікс смаків",
        type: 'meat',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size:{
            weight: 470,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id:90,
        icon:'assets/images/pizza_8.jpg',
        title: "Дольче Маре",
        type: 'seafood',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size:{
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id:6,
        icon:'assets/images/pizza_4.jpg',
        title: "Россо Густо",
        type: 'seafood',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 189
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299
        }
    }
];
for (let pizza of pizza_info){
    let new_pizza = document.createElement('div');
    let pizza_type = pizza.type==="meat"?"М'ясна піца":pizza.type==="seafood"?"Піца з морепродуктами"
        :"Веганська піца";
    new_pizza.classList.add('pizza-item')
    new_pizza.setAttribute("type", pizza.type)
    if(pizza.content.pineapple!==undefined){
        new_pizza.setAttribute("add-ons", "pineapple")
    }
    if(pizza.content.mushroom!==undefined){
        new_pizza.setAttribute("add-ons", "mushrooms")
    }
    let single = "single"
    if(pizza.small_size!==undefined && pizza.big_size!==undefined){
        single = ""
    }
    new_pizza.innerHTML = `<div class="thumbnail">
            <img src="${pizza.icon}" alt="pizza-image">
            <div class="information">
                <span class="name">
                    ${pizza.title}
                </span>
                <span class="pizza-type">
                    ${pizza_type}
                </span>
                <span class="ingredients">
                ${Object.values(pizza.content).flat().join(', ')}
                </span>
                <div class="size-info ${single}">
                </div>
            </div>
        </div>`
    let small_size = document.createElement("div")
    small_size.classList.add("size-s")
    let big_size = document.createElement("div")
    big_size.classList.add("size-l")
    let products = document.querySelector('.list');
    if(pizza.small_size!==undefined){
        small_size.innerHTML = `<div class="size">
                            <img src="assets/images/size-icon.svg"/><span>${pizza.small_size.size}</span>
                        </div>
                        <div class="weight">
                            <img src="assets/images/weight.svg"/><span>${pizza.small_size.weight}</span>
                        </div>
                        <div class="price">
                            <b>${pizza.small_size.price}</b>
                        </div>
                        <span>грн.</span>
                        <button type="button" onclick="buy_small()">
                            Купити
                        </button>`
        new_pizza.querySelector(".size-info").appendChild(small_size)
    }
    if(pizza.big_size!==undefined){
        big_size.innerHTML = `  <div class="size">
                        <img src="assets/images/size-icon.svg"/><span>${pizza.big_size.size}</span>
                    </div>
                    <div class="weight">
                        <img src="assets/images/weight.svg"/><span>${pizza.big_size.weight}</span>
                    </div>
                    <div class="price">
                        <b>${pizza.big_size.price}</b>
                    </div>
                    <span>грн.</span>
                    <button type="button" onclick="buy_large()">
                        Купити
                    </button>`
        new_pizza.querySelector(".size-info").appendChild(big_size)
    }
    if(pizza.is_new!==undefined){
        let badge = document.createElement("div")
        badge.classList.add("new")
        badge.innerHTML = `Нова`
        new_pizza.appendChild(badge)
        products.appendChild(new_pizza)
        continue
    }
    if(pizza.is_popular!==undefined){
        let badge = document.createElement("div")
        badge.classList.add("popular")
        badge.innerHTML = `Популярна`
        new_pizza.appendChild(badge)
    }
    products.appendChild(new_pizza)
}
let footer = document.createElement("footer")
footer.classList.add("footer")
footer.innerHTML = `<span>Pizza.23 - практичний проект в межах курсу з основ веб-технологій в межах Києво-Могилянської академії</span>
        <span>Доставка піци не здійснюється</span>
    `
document.querySelector(".list").appendChild(footer)
document.querySelector('.pizzas-amount').textContent = pizza_info.length
let total = document.querySelector(".cart .cart-title span span")
let total_sum = document.querySelector(".cart .buy-section .sum")
let all_pizzas = 8
class Pizza{
    constructor(name, large, quantity, price, image, weight) {
        this.name = name
        this.large = large
        this.quantity = quantity
        this.price = price
        this.image = image
        this.weight = weight
    }
}
let pizza_ordered = []
function buy_large(){
    let item = event.target.closest(".thumbnail")
    let name = item.querySelector(".name").textContent.trim()
    let large_name = name + " (Велика)"
    let price = item.querySelector(".size-l").querySelector(".price").querySelector('b').textContent
    for(let pizza of pizza_ordered){
        if(pizza.name===name && pizza.large){
           pizza.quantity++
            for (let order of document.querySelector(".order-list").getElementsByClassName("ordered-item")){
                    if(order.querySelector(".pizza-name").textContent==large_name.trim()){
                        let quantity = order.querySelector(".amount")
                        amount = parseInt(quantity.textContent)
                        quantity.textContent = amount+1
                        total.textContent = parseInt(total.textContent) + 1
                        order.querySelector(".minus").classList.remove('disabled')
                        total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн"
                        localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))
                        return;
                    }
            }
        }
    }
    let weight = item.querySelector(".size-l").querySelector(".weight").querySelector('span').textContent
    let new_order = document.createElement('div')
    let image = item.querySelector("img").getAttribute('src')
    new_order.classList.add("ordered-item")
    pizza_ordered.push(new Pizza(name, true, 1, price, image, weight))
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
                    <button type="button" class="minus disabled" onclick="reduce()">
                        -
                    </button>
                    <span class="amount">1</span>
                    <button type="button" class="plus" onclick="increase()">
                        +
                    </button>
                </div>
                <button type="button" class="delete" onclick="remove()">
                        x
                </button>
            </form>
            </div>
            <div class="order-picture">
                <img src=${image}>
            </div>
        </div>
    `
    document.querySelector(".order-list").appendChild(new_order)
    total.textContent = parseInt(total.textContent) + 1
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн"
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))
}
function buy_small(){
    let item = event.target.closest(".thumbnail")
    let name = item.querySelector(".name").textContent.trim()
    let large_name = name + " (Мала)"
    let price = item.querySelector(".size-s").querySelector(".price").querySelector('b').textContent
    for(let pizza of pizza_ordered){
        if(pizza.name===name && !pizza.large){
            pizza.quantity++
            for (let order of document.querySelector(".order-list").getElementsByClassName("ordered-item")){
                if(order.querySelector(".pizza-name").textContent==large_name.trim()){
                    let quantity = order.querySelector(".amount")
                    amount = parseInt(quantity.textContent)
                    quantity.textContent = amount+1
                    total.textContent = parseInt(total.textContent) + 1
                    order.querySelector(".minus").classList.remove('disabled')
                    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн"
                    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))
                    return;
                }
            }
        }
    }
    let weight = item.querySelector(".size-s").querySelector(".weight").querySelector('span').textContent
    let new_order = document.createElement('div')
    let image = item.querySelector("img").getAttribute('src')
    pizza_ordered.push(new Pizza(name, false, 1, price, image, weight))
    new_order.classList.add("ordered-item")
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
                    <button type="button" class="minus disabled" onclick="reduce()">
                        -
                    </button>
                    <span class="amount">1</span>
                    <button type="button" class="plus" onclick="increase()">
                        +
                    </button>
                </div>
                <button type="button" class="delete" onclick="remove()">
                        x
                </button>
            </form>
            </div>
            <div class="order-picture">
                <img src=${image}>
            </div>
        </div>
    `
    document.querySelector(".order-list").appendChild(new_order)
    total.textContent = parseInt(total.textContent) + 1
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + parseInt(price)) + "грн"
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))
}
function downloadLocal(){
        pizza_ordered = JSON.parse(localStorage.getItem('pizzaList'))
        let disabled
        let name
        let quantity
        let weight
        let img
        let price
        let new_order
        let size
        let total_ordered = 0
        let total_price = 0
        let list = JSON.parse(localStorage.getItem('pizzaList'))
        for (let item of list){
            total_ordered += parseInt(item.quantity)
            total_price += parseInt(item.quantity)*parseInt(item.price)
            name = item.name
            if(item.large){
                name += " (Велика)"
                size = 40
            }
            else{
                name+=" (Мала)"
                size = 30
            }
            disabled = parseInt(item.quantity)===1?"disabled":""
            weight = item.weight
            quantity = item.quantity
            price = item.price
            img = item.image
            new_order = document.createElement('div')
            new_order.classList.add("ordered-item")
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
                    <button type="button" class="minus ${disabled}" onclick="reduce()">
                        -
                    </button>
                    <span class="amount">${quantity}</span>
                    <button type="button" class="plus" onclick="increase()">
                        +
                    </button>
                </div>
                <button type="button" class="delete" onclick="remove()">
                        x
                </button>
            </form>
            </div>
            <div class="order-picture">
                <img src=${img}>
            </div>
        </div>
    `
            document.querySelector(".order-list").appendChild(new_order)
        }
        total.textContent = total_ordered
        total_sum.textContent = total_price + "грн"
    }
if(localStorage.getItem("pizzaList")!==null){
    downloadLocal()
}

function increase(){
    let order = event.target.closest(".ordered-item");
    let quantity = order.querySelector(".amount")
    let name
    let size
    if(order.querySelector(".pizza-name").textContent.split(" ").length===2) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0]
        size = order.querySelector(".pizza-name").textContent.split(" ")[1]
    }
    if(order.querySelector(".pizza-name").textContent.split(" ").length===3){
        name = order.querySelector(".pizza-name").textContent.split(" ")[0] + " " +
            order.querySelector(".pizza-name").textContent.split(" ")[1]
        size = order.querySelector(".pizza-name").textContent.split(" ")[2]
    }
    for(let pizza of pizza_ordered ){
        if(pizza.name===name&&((pizza.large && size==="(Велика)")||(!pizza.large && size==="(Мала)"))){
            pizza.quantity++
        }
    }
    amount = parseInt(quantity.textContent)
    quantity.textContent = amount+1
    total.textContent = parseInt(total.textContent) + 1
    order.querySelector(".minus").classList.remove('disabled')
    let price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3))
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) + price) + "грн"
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))
}
function reduce(){
    let order = event.target.closest(".ordered-item");
    let quantity = order.querySelector(".amount")
    amount = parseInt(quantity.textContent)
    let name
    let size
    if(order.querySelector(".pizza-name").textContent.split(" ").length===2) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0]
        size = order.querySelector(".pizza-name").textContent.split(" ")[1]
    }
    if(order.querySelector(".pizza-name").textContent.split(" ").length===3){
        name = order.querySelector(".pizza-name").textContent.split(" ")[0] + " " +
            order.querySelector(".pizza-name").textContent.split(" ")[1]
        size = order.querySelector(".pizza-name").textContent.split(" ")[2]
    }
    for(let pizza of pizza_ordered ){
        if(pizza.name===name&&((pizza.large && size==="(Велика)")||(!pizza.large && size==="(Мала)"))){
            pizza.quantity--
            break;
        }
    }
    quantity.textContent = amount-1
    total.textContent = parseInt(total.textContent) - 1
    if(quantity.textContent==1){
        order.querySelector(".minus").classList.add('disabled')
    }
    let price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3))
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) - price) + "грн"
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))


}
function remove(){
    let order = event.target.closest(".ordered-item");
    let quantity = order.querySelector(".amount").textContent
    if(order.querySelector(".pizza-name").textContent.split(" ").length===2) {
        name = order.querySelector(".pizza-name").textContent.split(" ")[0]
        size = order.querySelector(".pizza-name").textContent.split(" ")[1]
    }
    if(order.querySelector(".pizza-name").textContent.split(" ").length===3){
        name = order.querySelector(".pizza-name").textContent.split(" ")[0] + " " +
            order.querySelector(".pizza-name").textContent.split(" ")[1]
        size = order.querySelector(".pizza-name").textContent.split(" ")[2]
    }
    for(let pizza of pizza_ordered ){
        if(pizza.name===name&&((pizza.large && size==="(Велика)")||(!pizza.large && size==="(Мала)"))){
            pizza_ordered=pizza_ordered.filter(item => item !== pizza)
            break;
        }
    }
    let price = parseInt(order.querySelector(".control-panel span").textContent.slice(0, -3))
    total_sum.textContent = (parseInt(total_sum.textContent.split(" ")[0]) - price*parseInt(quantity)) + "грн"
    total.textContent = parseInt(total.textContent) - parseInt(quantity)
    order.remove()
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))

}
function clear_orders(){
    let list = document.querySelector(".order-list")
    list.innerHTML = ``
    pizza_ordered = []
    total.textContent = 0
    total_sum.textContent = "0 грн"
    localStorage.setItem("pizzaList", JSON.stringify(pizza_ordered))
}
function filter_pizza(element){
    for (let filter of document.querySelector(".filters").getElementsByTagName("span")){
        filter.classList.remove("chosen")
    }
    element.classList.add("chosen")
    all_pizzas = 0
    let filter = element.classList[0].trim()
    if(filter==='meat' || filter==='seafood' || filter==='vegan'){
        for (let pizza of document.getElementsByClassName("pizza-item")){
            pizza.style.display = "inline-block"
            if(pizza.getAttribute('type')!==filter){
                pizza.style.display = "none"
            }
            else{
                all_pizzas+=1
            }
        }
    }
    else if(filter==='mushrooms' || filter==="pineapple"){
        for (let pizza of document.getElementsByClassName("pizza-item")){
            pizza.style.display = "inline-block"
            if(pizza.getAttribute('add-ons')!==filter){
                pizza.style.display = "none"
            }
            else{
                all_pizzas+=1
            }
        }
    }
    else if(filter==='all'){
        for (let pizza of document.getElementsByClassName("pizza-item")){
            pizza.style.display = "inline-block"
                all_pizzas+=1
        }
    }
    document.querySelector(".pizza-filters .pizzas-amount").textContent = all_pizzas

}
function openLink() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with the URL you want to open
}
