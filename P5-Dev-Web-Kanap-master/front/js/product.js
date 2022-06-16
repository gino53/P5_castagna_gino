const product = window.location.search.split("?").join("");
console.log(product);

const productDetail = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json());
    };

const productDisplay = async () => {
    await fetchProduct();

    document.getElementById("")
};

productDisplay();