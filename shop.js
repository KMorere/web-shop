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
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(products));
    
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

        const button = document.createElement("button");
        button.addEventListener("click", function() {addProduct(product)})

        let image = document.createElement("img");
        image.src = "./Resources/Burger_King_foot_lettuce.jpg"

        const title = document.createElement("p");
        title.className = "name";
        title.textContent = product.desc;

        button.append(image);
        itemDiv.appendChild(button);
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

loadCart();

/**
 * Load the products from the cart in the local storage
 * and fill the shopping cart with them.
 * @returns The loaded array.
 */
function loadCart() {
    let cart = localStorage.getItem("cart_products");

    let cartArray = JSON.parse(cart);
    let uniqueArray = [...new Set(cartArray)];
    uniqueArray.forEach((product, index) => {
        createCartElement(product, getOccurence(cartArray, product));
    });

    return cartArray
}

var hidden = true;
var overlay = document.getElementById("overlay");
var cartElem = document.getElementById("cart");
/**
 * Called by the shopping cart button to display the cart panel.
 */
function getCart() {
    if (hidden === false) {
        cartElem.classList.toggle("close");
        document.getElementById("cart_content").style.display = "none";
    } else {
        cartElem.classList.toggle("open");
        document.getElementById("cart_content").style.display = "block";
        overlay.style.display = "block";
        cartElem.style.display = "block";
        hidden = false;
    }
}

if (cartElem !== null) {
    cartElem.addEventListener("animationend", (e) => {
        if (e.animationName === "translateRev") {
            overlay.style.display = "none";
            cartElem.style.display = "none";
            hidden = true;
            cartElem.classList.remove("close");
        } else if (e.animationName === "translate") {
            cartElem.classList.remove("open");
        }
    });
}

/**
 * Create an HTML element on the web page inside the cart.
 * @param {String} item Name of the value to create.
 * @param {Number} amount Number of occurence in the cart.
 */
function createCartElement(item, amount) {
    let containers = document.querySelectorAll("#cart_container");
    containers.forEach(container => {
        if (container) {
            let product = document.createElement("div");
            product.innerHTML = amount + "x " + item;
            container.append(product);
        }
    });
}

/**
 * Get the amount of times a value appears inside an array.
 * @param {Array} array Array to iterate.
 * @param {*} value Value to count.
 * @returns 
 */
function getOccurence(array, value) {
    return array.filter((v) => (v === value)).length;
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