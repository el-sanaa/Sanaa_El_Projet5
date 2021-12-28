
let productsData = []

const fetchProducts = async () => {
    await fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => {
            productsData = data
            console.log(productsData);
        });
};

// injecter html et faire une boucle/ methode map
 //Chercher un seul produit
const productsDisplay = async () => {
    await fetchProducts();

    document.getElementById("items").innerHTML = productsData.map(
        (products) => `
       
     
     <a href="./product.html?id=${products._id}">
     <article>  
             <img src="${products.imageUrl}" alt="image du canapé 1 ${products.name}" />
             <h3 class="productName">${products.name}</h3>
             <p class="productDescription">${products.description}</P>
     
             </article>
     </a>
   
     `,
    )
        .join("");

};

productsDisplay();


