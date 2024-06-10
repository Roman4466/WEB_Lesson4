export function saveToLocalStorage(pizzaOrdered) {
    localStorage.setItem("pizzaList", JSON.stringify(pizzaOrdered));
}

export function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('pizzaList')) || [];
}
