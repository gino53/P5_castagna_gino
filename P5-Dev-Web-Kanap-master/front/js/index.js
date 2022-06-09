let productsData = [];

const fetchProducts = async () => {
   await fetch ("http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((promise) => {
       productsData = promise
       console.log(productsData);
   });
};

const productsDisplay = async () => {
    await fetchProducts ();

    document.getElementById("items").innerHTML = productsData.map
    ((products) => 
        `
            <a id="${products._id}" href="./product.html?${products._id}">
                <article>
                    <img src="${products.imageUrl}" alt="${products.altTxt}"/>
                    <h3 class="productName">${products.name}</h3>
                    <p class="productDescription">${products.description.toUpperCase()}</p>
                </article>
            </a>
        `,
    ).join("");
};

productsDisplay();