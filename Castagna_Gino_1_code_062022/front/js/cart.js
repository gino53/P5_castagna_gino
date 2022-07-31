//Calcul du prix et de la quantité total
function updateTotalPriceAndQuantity() {
    const products = JSON.parse(localStorage.getItem("cart"));

    let totalQty = 0;
    let totalPrice = 0;

    for (let i in products) {
        totalQty += products[i].quantity;
        totalPrice += products[i].price * products[i].quantity;
    }

    document.querySelector("#totalQuantity").textContent = totalQty;
    document.querySelector("#totalPrice").textContent = totalPrice;
}

function displayCart () {
    const products = JSON.parse(localStorage.getItem("cart"));
    
    //Injection pour chaque produit des caractéristiques dans la page HTML
    products.forEach(product => {
        
        let productId = product._id;
        let productColor = product.color;

        //article
        let art = document.createElement("article");
        art.classList.add("cart__item");
        art.setAttribute("data-id", productId);
        art.setAttribute("data-color", productColor);
        document.querySelector("#cart__items").appendChild(art);

        //image
        const divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        art.appendChild(divImg);

        const img = document.createElement("img");
        img.setAttribute("src", `${product.imageUrl}`);
        img.setAttribute("alt", `${product.altTxt}`);
        divImg.appendChild(img);

        const divItem = document.createElement("div");
        divItem.classList.add("cart__item__content");
        art.appendChild(divItem);

        //description
        const divDesc = document.createElement("div");
        divDesc.classList.add("cart__item__content__description");
        divItem.appendChild(divDesc);

        //name
        const name = document.createElement("h2");
        name.textContent = `${product.name}`;
        divDesc.appendChild(name);

        //color
        const color = document.createElement("p");
        color.textContent = "Couleur : " + productColor;
        divDesc.appendChild(color);

        //price
        const price = document.createElement("p");
        price.textContent = "Prix : " + `${product.price}` + " €";
        divDesc.appendChild(price);

        //settings
        const divSet = document.createElement("div");
        divSet.classList.add("cart__item__content__settings");
        divItem.appendChild(divSet);

        //quantity
        const divQty = document.createElement("div");
        divQty.classList.add("cart__item__content__settings__quantity");
        divSet.appendChild(divQty);

        const quantity = document.createElement("p");
        quantity.textContent = "Qté : ";
        divQty.appendChild(quantity);

        const inputQty = document.createElement("input");
        inputQty.setAttribute("type", "number");
        inputQty.classList.add("itemQuantity");
        inputQty.setAttribute("name", "itemQuantity");
        inputQty.setAttribute("min", "1");
        inputQty.setAttribute("max", "100");
        inputQty.setAttribute("value", product.quantity);
        divQty.appendChild(inputQty);

        //Au click, la quantité et le prix total change par rapport à la valeur de l'input
        inputQty.addEventListener("change", (event) => {
            product.quantity = +event.target.value;
            localStorage.cart = JSON.stringify(products);
            updateTotalPriceAndQuantity();
        });

        //delete
        const divDlt = document.createElement("div");
        divDlt.classList.add("cart__item__content__settings__delete");
        divSet.appendChild(divDlt);

        const btnDlt = document.createElement("p");
        btnDlt.classList.add("deleteItem");
        btnDlt.textContent = "Supprimer";
        divDlt.appendChild(btnDlt);
        
        //Au click, le produit est supprimer et la quantité et le prix total change
        divDlt.addEventListener("click", () => {
            localStorage.setItem("cart", JSON.stringify(products.filter(product => product._id !== productId || product.color !== productColor)));
            divDlt.closest("article").remove();
            updateTotalPriceAndQuantity();
        });
    });

    updateTotalPriceAndQuantity();

    //order
    document.querySelector("#order").addEventListener("click", async () => {

        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const address = document.querySelector("#address").value;
        const city = document.querySelector("#city").value;

        //Validation de l'email avec Regex
        const email = document.querySelector("#email").value;
        const emailError = document.querySelector("#emailErrorMsg");
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let error = false;
        if (email) {
            if (!email.match(regex)) {
            emailError.textContent = "Adresse email invalide.";
            error = true;
            }
        }
        if (error) {
            return;
        }

        //Création objet contact
        const contact = {
            firstName,
            lastName,
            address,
            city,
            email
        };
        
        //Envoie d'une requête POST à l'API
        const settings = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contact,
                products: products.map(product => product._id)
            })
        };

        const response = await fetch("http://localhost:3000/api/products/order", settings);
        if (!response.ok) {
            return
        }

        const responseText = await response.text();
        if (!responseText) {
            return
        }
        
        const order = await JSON.parse(responseText);
        if (!order.orderId) {
            return
        }

        location.href = `confirmation.html?orderId=${order.orderId}`;
    });
}

displayCart();