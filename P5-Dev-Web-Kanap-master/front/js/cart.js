const addProduct = JSON.parse(localStorage.getItem("product"));

const basketDisplay = async () => {
    console.log();
    if (addProduct) {
        await addProduct;
        console.log(addProduct);
    }
};

basketDisplay();