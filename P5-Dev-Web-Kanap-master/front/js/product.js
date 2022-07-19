async function fetchProduct() {
    const productId = new URL(window.location).searchParams.get("id");
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    return res.json();
};

async function displayProduct() {
    const product = await fetchProduct();

    document.querySelector("title").textContent = `${product.name}`;

    const img = document.createElement("img");
    img.setAttribute('src', `${product.imageUrl}`);
    img.setAttribute('alt', `${product.altTxt}`);
    document.querySelector("#img").appendChild(img);

    document.querySelector("#title").textContent = `${product.name}`;

    document.querySelector("#price").textContent = `${product.price}`;

    document.querySelector("#description").textContent = `${product.description}`;

    product.colors.forEach(color => {
        const option = document.createElement("option");
        option.setAttribute('value', `${color}`);
        option.textContent = `${color}`;
        document.querySelector("#colors").appendChild(option);
    });

    document.querySelector("#addToCart").addEventListener("click", () => {

        const colorValue = document.querySelector("#colors");
        const quantityValue = document.querySelector("#quantity");

        if (quantityValue.value > 0 && quantityValue.value <= 100 && !!colorValue.value) {

            const productDetail = {
                ...product,
                color: colors.value,
                quantity: +quantity.value
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let foundProduct = cart.find(cart => cart.id === productDetail.id && cart.color === productDetail.color);

            foundProduct !== undefined ? foundProduct.quantity = +productDetail.quantity + +foundProduct.quantity : cart.push(productDetail);

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Produit ajouté au panier.");
        }
    });
}

displayProduct();