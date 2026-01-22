loadCart();

/**
 * Load the products from the cart in the local storage
 * and fill the shopping cart with them.
 * @returns The loaded array.
 */
function loadCart() {
    let cart = localStorage.getItem("cart_products");
    console.log("Loaded : ", cart);

    if (document.getElementById("cart")) {
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
    console.log(containers);
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