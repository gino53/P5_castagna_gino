async function fetchProduct(productId) {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    return res.json();
};

/**
 * Calcul du prix et de la quantité total
 */


/**
 * Injection des données produits dans la page HTML, contrôle bouton supprimer et quantité, contrôle du formulaire
 */
function displayCart() {
    const products = JSON.parse(localStorage.getItem("cart"));

    // Injection pour chaque produit des caractéristiques dans la page HTML
    products.forEach(async cartProduct => {
        const apiProduct = await fetchProduct(cartProduct._id);

        const product = {
            ...cartProduct,
            ...apiProduct
        };

        let productId = product._id;
        let productColor = product.color;

        // Article
        let art = document.createElement("article");
        art.classList.add("cart__item");
        art.setAttribute("data-id", productId);
        art.setAttribute("data-color", productColor);
        document.querySelector("#cart__items").appendChild(art);

        // Image
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

        // Description
        const divDesc = document.createElement("div");
        divDesc.classList.add("cart__item__content__description");
        divItem.appendChild(divDesc);

        // Name
        const name = document.createElement("h2");
        name.textContent = `${product.name}`;
        divDesc.appendChild(name);

        // Color
        const color = document.createElement("p");
        color.textContent = "Couleur : " + productColor;
        divDesc.appendChild(color);

        // Price
        const price = document.createElement("p");
        price.textContent = "Prix : " + `${product.price}` + " €";
        divDesc.appendChild(price);

        // Settings
        const divSet = document.createElement("div");
        divSet.classList.add("cart__item__content__settings");
        divItem.appendChild(divSet);

        // Quantity
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

        // Au click, la quantité et le prix total change par rapport à la valeur de l'input
        inputQty.addEventListener("change", (event) => {
            cartProduct.quantity = +event.target.value;
            localStorage.cart = JSON.stringify(products);
            let totalQty = 0;
            let totalPrice = 0;
            for (let i in products) {
                totalQty += products[i].quantity;
                totalPrice += apiProduct.price * products[i].quantity;
            }
            document.querySelector("#totalQuantity").textContent = totalQty;
            document.querySelector("#totalPrice").textContent = totalPrice;
        });

        // Delete
        const divDlt = document.createElement("div");
        divDlt.classList.add("cart__item__content__settings__delete");
        divSet.appendChild(divDlt);

        const btnDlt = document.createElement("p");
        btnDlt.classList.add("deleteItem");
        btnDlt.textContent = "Supprimer";
        divDlt.appendChild(btnDlt);

        // Au click, le produit est supprimer et la quantité et le prix total change
        divDlt.addEventListener("click", () => {
            localStorage.setItem("cart", JSON.stringify(products.filter(product => product._id !== productId || product.color !== productColor)));
            divDlt.closest("article").remove();
            let totalQty = 0;
            let totalPrice = 0;
            for (let i in products) {
                totalQty += products[i].quantity;
                totalPrice += apiProduct.price * products[i].quantity;
            }
            document.querySelector("#totalQuantity").textContent = totalQty;
            document.querySelector("#totalPrice").textContent = totalPrice;
        }
        );

        let totalQty = 0;
        let totalPrice = 0;

        for (let i in products) {
            totalQty += products[i].quantity;
            totalPrice += apiProduct.price * products[i].quantity;
        }

        document.querySelector("#totalQuantity").textContent = totalQty;
        document.querySelector("#totalPrice").textContent = totalPrice;
    });
}

/**
 * Formulaire, contrôle inputs, requête POST et redirection vers la page confirmation
 */
function userForm() {
    // Au click, si les informations sont corrects, renvoie sur la page de confirmation
    document.querySelector("#order").addEventListener("click", async () => {

        const products = JSON.parse(localStorage.getItem("cart"));
        let error = false;

        // Validation des inputs avec Regex
        const firstName = document.querySelector("#firstName").value;
        const firstNameError = document.querySelector("#firstNameErrorMsg");
        const firstNameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        if (firstName) {
            if (!firstName.match(firstNameRegex)) {
                firstNameError.textContent = "Le prénom doit contenir entre 2-20 caractères et ne doit pas contenir de caractères spéciaux";
                error = true;
            }
        }
        if (error) {
            return;
        }

        const lastName = document.querySelector("#lastName").value;
        const lastNameError = document.querySelector("#lastNameErrorMsg");
        const lastNameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        if (lastName) {
            if (!lastName.match(lastNameRegex)) {
                lastNameError.textContent = "Le nom de famille doit contenir entre 2-20 caractères et ne doit pas contenir de caractères spéciaux";
                error = true;
            }
        }
        if (error) {
            return;
        }

        const address = document.querySelector("#address").value;
        const addressError = document.querySelector("#addressErrorMsg");
        const addressRegex = /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/;
        if (address) {
            if (!address.match(addressRegex)) {
                addressError.textContent = "L'adresse doit comprendre le numéro, la voie et le nom de la voie";
                error = true;
            }
        }
        if (error) {
            return;
        }

        const city = document.querySelector("#city").value;
        const cityError = document.querySelector("#cityErrorMsg");
        const cityRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        if (city) {
            if (!city.match(cityRegex)) {
                cityError.textContent = "Le nom de la ville doit contenir entre 2-20 caractères et ne doit pas contenir de caractères spéciaux";
                error = true;
            }
        }
        if (error) {
            return;
        }

        const email = document.querySelector("#email").value;
        const emailError = document.querySelector("#emailErrorMsg");
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (email) {
            if (!email.match(emailRegex)) {
                emailError.textContent = "Adresse email invalide.";
                error = true;
            }
        }
        if (error) {
            return;
        }

        if (products != null && products?.length > 0) {
            // Création objet contact
            if (firstName, lastName, address, city, email) {
                const contact = {
                    firstName,
                    lastName,
                    address,
                    city,
                    email
                };

                // Envoie d'une requête POST à l'API
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
            } else {
                alert("Veuillez remplir le formulaire");
            }
        } else {
            alert("Votre panier est vide");
        }
    });
}

userForm();
displayCart();