let productData = [];

const fetchProduct = async () => {
   await fetch ("http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((promise) => {
       productData = promise
       console.log(productData);
   });
};

const productDisplay = async () => {
    await fetchProduct ();

    document.getElementById("items").innerHTML = productData.map(
        (product) => `
    <a ${product._id} href="./product.html" class="items">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}"/>
            <h3 class="productName">${product.name.toUpperCase()}</h3>
        </article>
    </a>
    `,
    );
};



productDisplay();