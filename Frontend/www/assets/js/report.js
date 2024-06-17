document.addEventListener("DOMContentLoaded", () => {
    const pizzaOrdered = JSON.parse(localStorage.getItem('pizzaList')) || [];

    const data = pizzaOrdered.map(pizza => ({
        name: pizza.name,
        size: pizza.large ? 'Large' : 'Small',
        quantity: pizza.quantity,
        price: pizza.price,
        total: pizza.quantity * pizza.price
    }));

    const pivot = new WebDataRocks({
        container: "#report-container",
        toolbar: true,
        report: {
            dataSource: {
                data: data
            },
            slice: {
                rows: [
                    { uniqueName: "name" },
                    { uniqueName: "size" }
                ],
                columns: [
                    { uniqueName: "[Measures]" }
                ],
                measures: [
                    { uniqueName: "quantity", aggregation: "sum" },
                    { uniqueName: "price", aggregation: "sum" },
                    { uniqueName: "total", aggregation: "sum" }
                ]
            }
        }
    });
});
