export function filterPizza(element) {
    const filter = element.classList[0].trim();
    document.querySelectorAll(".filters span").forEach(span => span.classList.remove("chosen"));
    element.classList.add("chosen");

    let allPizzas = 0;
    document.querySelectorAll(".pizza-item").forEach(pizza => {
        pizza.style.display = "inline-block";
        if (filter !== 'all' && !pizza.getAttribute('type').includes(filter) && !pizza.getAttribute('add-ons').includes(filter)) {
            pizza.style.display = "none";
        } else {
            allPizzas++;
        }
    });
    document.querySelector(".pizza-filters .pizzas-amount").textContent = allPizzas;
}
