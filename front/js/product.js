

//router.get('/:id', productCtrl.getOneProduct);
//methode window.location.search
//methode URLSearchParams pour extraire et passer l�id 
//d�une page � une autre
let searchId = [];

const getInformation = window.location.search;
console.log(getInformation);

const kanapId = new URLSearchParams(getInformation);
console.log(kanapId);

const id = kanapId.get("id");
console.log(id);


//afficher les d�tails de l'id du produit 
let selectedElements = [];

const fetchid = async () => {

    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((promise) => {
            selectedElements = promise;
            console.log(selectedElements);
        });
};


//Ins�rer le produit et ses d�tails dans la page produit
const productsDisplay = async () => {
    await fetchid();

    document.getElementById("title").innerHTML = `
         ${selectedElements.name}`
    document.getElementById("price").innerHTML = `
          ${selectedElements.price}`
    document.getElementById("description").innerHTML = `
          ${selectedElements.description}`


const item__img = document.getElementById("img").innerHTML = `
<img src="${selectedElements.imageUrl}" alt="${selectedElements.altTxt}">`;
    console.log(item__img);




const colors = document.getElementById("colors");
    console.log(colors);
    console.log(selectedElements.colors);

// Boucle for qui affiche toutes les options des couleurs
    for (let i = 0; i < selectedElements.colors.length; i++) {
        console.log(selectedElements.colors[i]);
        colors.innerHTML += `
    <option value = ${selectedElements.colors[i]}>${selectedElements.colors[i]}</option>`;
    };


 const quantity = document.getElementById("quantity");
    console.log(quantity);

 
const button = document.getElementById("addToCart");
    console.log(button);

//Ecouter l'event
    button.addEventListener("click", (e) => {
        
     event.preventDefault();
        console.log(button);


       
    })

 //R�cuperer les valeurs  / Ajouter au panier
    let chosenProduct = {
        title: selectedElements.name,
        img: selectedElements.imageUrl,
        id: id,
        price: selectedElements.price,
        colors: selectedElements.colors,
        quantity: 1
    }
    console.log(chosenProduct);

    
//------------Locale Storage--------------

//Stocker dans la variable Keys and Values 
//convertir donn�es json (dans lecalstorage) en objet js
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

//Ajouter le produit choisi dans localstorage
//Ajouter les options et choix du client //Transformer en format JSON
const addProduct = () => {
    productInLocalStorage.push(chosenProduct);
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
}

//Si autres produits enregistr�s dans le local storage
if (productInLocalStorage) {
    addProduct();
    //popupConformation();
       }

//Sinon, produits enregistr�s 
else {
    productInLocalStorage = [];
    addProduct();
    //popupConformation();
       }
 }

productsDisplay();










