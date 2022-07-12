const fetchProducts = async () => fetch("http://localhost:3000/api/products")
   .then((res) => res.json());

const displayProducts = async () => {
   
   const products = await fetchProducts();
   
   const section = document.querySelector("section");

   const template = document.querySelector("#productTemplate");

   products.forEach((product) => {
      
      const clone = document.importNode(template.content, true);

      clone.querySelector("a").setAttribute("href", `./product.html?id=${product._id}`);
  
      const img = clone.querySelector("img");
      img.setAttribute("src", `${product.imageUrl}`);
      img.setAttribute("alt", `${product.altTxt}`);

      clone.querySelector(".productName").textContent = `${product.name}`;

      clone.querySelector(".productDescription").textContent = `${product.description}`;
   
      section.appendChild(clone);
   });
};

displayProducts();