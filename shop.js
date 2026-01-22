var products = [];
var buttons = [];
var min, max;

getProducts();

/**
 * Get the data from the json file.
 */
function getProducts() {
    fetch("products.json").then(response => {
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}).then(data => {
    createProducts(data);
    
    console.log("Loaded :", data);
}).catch(error => {
    console.error("Error :", error);
})
}

/**
 * Fill the shop's grid with the products loaded before-hand.
 * @param {JSON} data Reference of the products.
 */
function createProducts(data) {
    let container = document.getElementById("container");

    const datas = data.products;

    datas.forEach((product, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "card";

        const image = document.createElement("button");
        image.addEventListener("click", function() {addProduct(product)})

        const title = document.createElement("p");
        title.className = "name";
        title.textContent = product.desc;

        itemDiv.appendChild(image);
        itemDiv.appendChild(title);

        container.appendChild(itemDiv);
        products.push(product);
    });
}

/**
 * Add product to the cart.
 * @param {Product} item 
 */
function addProduct(item) {
    addToCart(item);
}

let expanded = false;
/**
 * Display the filters for the grid.
 */
function showCheckboxes() {
    const checkboxes = document.getElementById("checkboxes");
    
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function filterProducts() {
    let items = document.getElementById("container").children;
    products.forEach((product, i) => {
        if (product.price > 15) {
            if (document.getElementById("one").checked)
                items[i].style.display = "none";
            else
                items[i].style.display = "block";
        }
    });
}

/**
 * Hide elements from the grid with a price under input's threshold
 */
function filterPriceUnder() {
    min = document.getElementById("priceMin").value;
    if (min < 0 || min > max) return;

    let items = document.getElementById("container").children;
    products.forEach((product, i) => {
        if (product.price < min)
            items[i].style.display = "none";
        else
            items[i].style.display = "block";
    });
}

/**
 * Hide elements from the grid with a price above input's threshold
 */
function filterPriceAbove() {
    max = document.getElementById("priceMax").value;
    if (max < 0 || max < min) return;

    let items = document.getElementById("container").children;
    products.forEach((product, i) => {
        if (product.price > max)
            items[i].style.display = "none";
        else
            items[i].style.display = "block";
    });
}