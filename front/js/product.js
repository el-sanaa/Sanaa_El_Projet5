S//router.get('/:id', productCtrl.getOneProduct);
//methode window.location.search
const getInformation = window.location.search;
console.log(getInformation);

//methode constructor URLSearchParams pour extraire et passer l’id d’une page à une autre
const kanapId = new URLSearchParams(getInformation);
console.log(kanapId);

const id = kanapId.get("id");
console.log(id);

//afficher les détails de l'id du produit 
let selectedElements = [];

const fetchid = async () => {

    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((promise) => {
            selectedElements = promise;
            console.log(selectedElements);
        });
}; 

//Insérer le produit et ses détails dans la page produit
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

    let quantity = document.getElementById("quantity");
    console.log(quantity);

    const button = document.getElementById("addToCart");
    console.log(button);

    //Ecouter l'event
    button.addEventListener("click", (e) => {
        event.preventDefault();
        console.log(button);

        const numberQuantity = quantity.value
        console.log(numberQuantity);

        //Récuperer les valeurs  / Ajouter au panier
        let optionsProduct = {
            title: selectedElements.name,
            img: selectedElements.imageUrl,
            altTxt: selectedElements.altTxt,
            id: id,
            price: selectedElements.price,
            colors: selectedElements.colors,
            quantity: numberQuantity
        }
        console.log(optionsProduct);


        //Gestion du LocaleStorage--------------
        //Stocker les valeurs du formulaire dans le local storage
        //Stocker dans la variable Keys and Values mis dans le localstorage
        //convertir données json (dans lecalstorage) en objet js
        let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
        console.log(productInLocalStorage);

        //Function pour une fenêtre pop-up
        //Methode window.confirm
        const confirmation = () => {
            if (window.confirm(`Votre commande de ${numberQuantity}
            ${selectedElements.name} ${selectedElements.colors} est ajoute au panier
            Pour consulter votre panier, cliquez sur OK`)) {
                window.location.href = "cart.html";
            }
        }

        //Function pour ajouter un produit selectione dans le local storage
        const addProduct = () => {

            //Ajouter le produit choisi dans localstorage
            productInLocalStorage.push(optionsProduct);

            //Ajouter les options et choix du client //Transformer en format JSON
            localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
            console.log(productInLocalStorage);

        }
        // si il y a deja un produit enregistre dans le local storage
        if (productInLocalStorage) {
            addProduct();
            console.log(productInLocalStorage);
            confirmation();
        }
        //Sinon 
        else {
            productInLocalStorage = [];
            addProduct();
            console.log(productInLocalStorage);
            confirmation();
        }
        
    

    });

}
productsDisplay();