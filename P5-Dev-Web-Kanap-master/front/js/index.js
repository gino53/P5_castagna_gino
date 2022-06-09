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
        (meuble) => `
    <div id="card${product._id}" class="item item__img item__content">
    <h3 class="productName">${product.name.toUpperCase()}</h3>

    </div>
    `,
    );
};



productDisplay();