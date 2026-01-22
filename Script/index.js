getProducts();

function getProducts() {
    fetch("products.json").then(response => {
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}).then(data => {
    document.getElementById("name").textContent = JSON.stringify(data["products"][0]["name"], null, 1);

    /*let products = document.getElementById("selection");
    if (!products) {
        return;
    }
    let items = products.getElementsByTagName("li");
    let itemsArray = Array.from(items);

    itemsArray.forEach((item, index) => {
        item.textContent = JSON.stringify(data["products"][index]["name"], null, 1);
    });*/

    createProducts(data);
    
    console.log("Loaded :", data);
}).catch(error => {
    console.error("Error :", error);
})
}

function createProducts(data) {
    let products = document.getElementById("container");

    const datas = data["products"];

    datas.forEach((product, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "card";

        const image = document.createElement("div");

        const title = document.createElement("p");
        title.className = "name";
        title.textContent = product.desc;

        itemDiv.appendChild(image);
        itemDiv.appendChild(title);

        products.appendChild(itemDiv);
    });
}