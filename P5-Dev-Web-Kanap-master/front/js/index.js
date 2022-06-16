const fetchProducts = async () => fetch("http://localhost:3000/api/products")
   .then((res) => res.json());

const displayProducts = async () => {
   
   const products = await fetchProducts();
   
   const section = document.querySelector("section");

   const template = document.querySelector("#productTemplate");

   products.forEach((product) => {
      
      const clone = document.importNode(template.content, true);

      //<a>
      const tagA = clone.querySelector("a");
      tagA.href = `./product.html?id=${product._id}`;
      //

      //<img>
      const img = clone.querySelector("img");
      img.src = `${product.imageUrl}`;
      img.alt = `${product.altTxt}`;
      //

      //<h3>
      const tagH3 = clone.querySelector(".productName");
      tagH3.textContent = `${product.name}`;
      //

      //<p>
      const tagP = clone.querySelector(".productDescription");
      tagP.textContent = `${product.description}`;
      //

      section.appendChild(clone);
   })
};

displayProducts();