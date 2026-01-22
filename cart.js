loadCart();

/**
 * Load the products from the cart in the local storage
 * and fill the shopping cart with them.
 * @returns The loaded array.
 */
function loadCart() {
    let cart = localStorage.getItem("cart_products");
    console.log("Loaded : ", cart);

    if (document.getElementById("cart") && document.getElementById("order_button")) {
        if (cart === null) {
            document.getElementById("order_button").style.display = "none";
            document.getElementById("cart_empty_text").style.display = "block";
            return null;
        } else {
            document.getElementById("cart_empty_text").style.display = "none";
            document.getElementById("order_button").style.display = "block";
        }
    }

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

function setOrder() {
    localStorage.clear();
    location.reload();
}

/**
 * Store a product in the local storage.
 * @param {String} item Value to store.
 */
function addToCart(item) {
    let cart = [];
    if (loadCart() !== null)
        cart = loadCart();
    cart.push(item.name);
    localStorage.setItem("cart_products", JSON.stringify(cart));

    createCartElement(item.name);
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
            let product = getProductByName(item);
            let productContainer = document.createElement("div");
            productContainer.className = "cart_product";

            let productDiv = document.createElement("div");
            productDiv.innerHTML = amount + "x " + item;

            let image = document.createElement("img");
            image.src = product.image;

            let price = document.createElement("div");
            price.innerHTML = getPrice(getProductByName(item), amount) + "€";
            price.className = "product_price";

            productContainer.append(image);
            productContainer.append(productDiv);
            productContainer.append(price);
            container.append(productContainer);
        }
    });
}

/**
 * Get the total price of a product in the cart.
 * @param {*} item Product.
 * @param {Number} amount The amount of the same product.
 * @returns 
 */
function getPrice(item, amount) {
    return item.price * amount;
}

/**
 * Get the total cost of the shopping cart.
 * @returns The total cost of products.
 */
function getTotal() {
    let total = 0;
    products.forEach(product => {
        total += product.price;
    });

    return total;
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

function getProductByID(id) {
    let products = JSON.parse(localStorage.getItem("products"));

    products.forEach((product) => {
        if (product.id === id) {
            console.log(product);
            return product;
        }
    });
}

function getProductByName(name) {
    let products = JSON.parse(localStorage.getItem("products"));
    let prod;

    products.forEach((product) => {
        if (product.name === name) {
            prod = product;
        }
    });
    return prod;
}