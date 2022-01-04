//router.get('/:id', productCtrl.getOneProduct);
//methode window.location.search
const getInformation = window.location.search;
console.log(getInformation);

//methode constructor URLSearchParams pour extraire l'id
const kanapId = new URLSearchParams(getInformation);
console.log(kanapId);

const id = kanapId.get("id");
console.log(id);

//Interroger l’API pour récupérer les détails du produit
//Récupérer un seul et unique produit
let fetchId = fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => {
     selectedElements = promise;
        console.log(selectedElements);
               
//Insérer ces détails dans la page Produit (dans le DOM)  
let productName = document.getElementById("title");
        document.getElementById("title").innerHTML = `
         ${selectedElements.name}`

let productPrice = document.getElementById("price");
document.getElementById("price").innerHTML = `
    ${selectedElements.price}`

let productDescription = document.getElementById("description");
document.getElementById("description").innerHTML = `
    ${selectedElements.description}`

const item__img = document.getElementById("img").innerHTML = `
    <img src="${selectedElements.imageUrl}"
        alt="${selectedElements.altTxt}">`;
        console.log(item__img);

const colors = document.getElementById("colors");
        console.log(colors);
        console.log(selectedElements.colors);

    // Boucle for qui affiche toutes les options des couleurs
    for (let i = 0; i < selectedElements.colors.length; i++) {
        console.log(selectedElements.colors[i]);
        colors.innerHTML += `
        <option value = ${selectedElements.colors[i]}>
        ${selectedElements.colors[i]}</option>`;
    };

let quantity = document.getElementById("quantity");
        console.log(quantity);
let color=document.getElementById("colors");


const button = document.getElementById("addToCart");
        console.log(button);

        //Ecouter l'event
        button.addEventListener("click", (e) => {
            event.preventDefault();
                console.log(button);

        let numberQuantity = parseInt(quantity.value)
        if(numberQuantity<=0){
            //Alert pour remplir les champs
            alert("Veuillez SVP saisir un nombre d'article entre 1..100");
        }else if(color.value==""){
            alert("Veuillez SVP choisir une couleur  ");
        }
        else{

        console.log("numberQuantity");
        console.log(numberQuantity);

            //Récuperer les valeurs  / Ajouter au panier
            let optionsProduct = {
                title: selectedElements.name,
                img: selectedElements.imageUrl,
                altTxt: selectedElements.altTxt,
                id: id,
                price: (selectedElements.price *numberQuantity),
                colors: color.value,
                quantity: numberQuantity
            }
                console.log(optionsProduct);
        


//Gestion du LocaleStorage--------------
//Stocker les valeurs dans le local storage
//convertir les données json (dans lecalstorage) en objet js
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    console.log(productInLocalStorage);

//Function pour une fenetre pop-up
//Methode window.confirm
const confirmation = () => {
    if (window.confirm(`Votre commande de           
    ${selectedElements.name} ${selectedElements.colors} 
    est ajoute au panier
    Pour consulter votre panier, cliquez sur OK`)) {
        window.location.href = "cart.html";
    }
}
        
  
//Si il y a deja un produit enregistre dans le local storage
if (productInLocalStorage) {

    //Ajouter le produit choisi dans localstorage
    productInLocalStorage.push(optionsProduct);

    //Ajouter les options et choix du client //Transformer en format JSON
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
   
        console.log(productInLocalStorage);
        confirmation();
    } 

else {
    //Si il n'y pas de produit enregistr� dan le Locale storage
    productInLocalStorage = [];
    productInLocalStorage.push(optionsProduct);
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    
        console.log(productInLocalStorage);
        confirmation();
    }

    

         
    }
 })
})   
