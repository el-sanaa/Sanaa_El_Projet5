
//Mettre dans variable keys et values qui sont dans le localstorage
//Convertir données JSON du localstorage en format js

let products=JSON.parse(localStorage.getItem("product"));

let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

//Afficher produits du panier 
//Injecter HTML
const cartsPosition = document.querySelector("#cart__items");
console.log(cartsPosition);


let detailsCarts = [];

//Si le panier est vide afficher vide
if (productInLocalStorage === null || productInLocalStorage == 0) {
    const emptyCart =
        '<p>Panier est vide</p>';

    cartsPosition.innerHTML = emptyCart;

} else {
    // sinon afficher produits dans le localstorage
    //boucle for

    for(k=0;k<productInLocalStorage.length-1;k++){
        for(let j=k+1;j<productInLocalStorage.length;j++){
            if( productInLocalStorage[k].id==productInLocalStorage[j].id){
                productInLocalStorage[k].quantity=parseInt(productInLocalStorage[j].quantity)+parseInt(productInLocalStorage[k].quantity);
               productInLocalStorage[k].price=parseInt(productInLocalStorage[k].price)+parseInt(productInLocalStorage[j].price);
            productInLocalStorage.splice(j,1);
            }
        }
    }
 

    for (k = 0; k < productInLocalStorage.length; k++) {
        console.log(productInLocalStorage.length);

        detailsCarts = detailsCarts + `
        <article class="cart__item" data-id="${productInLocalStorage[k].id}" data-color="${productInLocalStorage[k].colors}">
        <div class="cart__item__img">
            <img src="${productInLocalStorage[k].img}" alt=""${productInLocalStorage[k].altTxt}">
                </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${productInLocalStorage[k].title}</h2>
                    <p>${productInLocalStorage[k].colors}</p>
                    <p>${productInLocalStorage[k].price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>${productInLocalStorage[k].quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[k].price}">&euro;
                    </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
              </article>
`;
    }

    if (k === productInLocalStorage.length) {
        //Injecter html dans la page cart (panier)
        cartsPosition.innerHTML = detailsCarts;

    }
}           



//Gestion des articles supprimes
let btnDelete = document.querySelectorAll(".deleteItem");

for (let d = 0; d < btnDelete.length; d++) {
    btnDelete[d].addEventListener("click", (event) => {
        event.preventDefault();

        //Selectionner (l'id) et (la couleur) de l'element a supprimer
        let idDelete = productInLocalStorage[d].id;
        let colorsDelete = productInLocalStorage[d].colors;

        //Methode filter
        productInLocalStorage = productInLocalStorage.filter(el => el.id !== idDelete || el.colors !== colorsDelete);
        
        // Envoyer la variable ds le local storage//Transformer en format JSON 
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));

        //Alerte produit supprime
        alert("Article supprime");
        location.reload();
    });
}



//Gestion du total des quantités
let itemsPrice = document.getElementsByClassName('itemQuantity');
console.log(itemsPrice);

let myLength = itemsPrice.length,
allPrice = 0;

for (let i = 0; i < myLength; ++i) {
    allPrice += itemsPrice[i].valueAsNumber;
}

let priceOfProduct = document.getElementById('totalPrice');
priceOfProduct.innerHTML = allPrice;
console.log(allPrice);


//Gestion de la quantite de produit
let totalsQuantity = [];
let quantityProduct=0;
for (let q = 0; q < productInLocalStorage.length; q++) {
     quantityProduct +=parseInt(productInLocalStorage[q].quantity);
}
//Mettre les prix ds la variable 
let quantities = document.getElementById("totalQuantity");
quantities.innerHTML = quantityProduct;



//Gestion de la modification du produit
let oneModification = document.querySelectorAll(".itemQuantity");
console.log(oneModification);

for (let m = 0; m < oneModification.length; m++) {
    oneModification[m].addEventListener("click", (event) => {
        event.preventDefault();

        //Selection de l'element à modifier en fonction de son id ET sa couleur
        let quantityChange = productInLocalStorage[m].quantityProduct;
        let quantityChangeValue = oneModification[m].valueAsNumber;

        const resultFind = produitLocalStorage.find((el) =>
            el.quantityChangeValue !== quantityChange);

        resultFind.quantityProduct = quantityChangeValue;
        productInLocalStorage[m].quantityProduct = resultFind.quantityProduct;

        localStorage.setItem("produit", JSON.stringify(productInLocalStorage));

        // refresh rapide
        location.reload();
    })
}


//------------Gestion du formulaire

const orders = document.querySelector("#order");
console.log(orders);

//Ecouter le click
orders.addEventListener("click", (e) => {
    e.preventDefault();

    //methode construtor,creer une class pour fabriquer l'objet 
    //et y mettre les valeurs du formulaire
    class constructorObjet {
        constructor() {
            this.firstName = document.querySelector("#firstName").value;
            this.lastName = document.querySelector("#lastName").value;
            this.address = document.querySelector("#address").value;
            this.city = document.querySelector("#city").value;
            this.email = document.querySelector("#email").value;

        }
    }

    //Appeler class constructor => pour creer l'objet contact
    const contact = new constructorObjet();
    console.log(contact);



    //----------Gestion du formulaire
    //Expression régulière
    const regExfirstNamelastNamecity = (value) => {
        return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
    }

   const regEemailail = (value) => {
       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }

    const regExaddress = (value) => {
        return /^[A-Za-z0-9\s]{1,50}$/.test(value);
    }

    const alertFalse = (value) => {
        return `${value}: Veuillez renseigner ce champ`;
    }

    function firstNameControl() {
        //controler de la validité du firstName
        const validfirstName = contact.firstName;
        if (regExfirstNamelastNamecity(validfirstName)) {
            firstNameErrorMsg.innerHTML = '';
            return true;

        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("firstName"));
            return false;
        }
    }

    function lastNameControl() {
        //controler le lastName
        const validlastName = contact.lastName;
        if (regExfirstNamelastNamecity(validlastName)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("lastName"));
            return false;
        }
    }

    function addressControl() {
        //controler  l'address
        const validaddress = contact.address
        if (regExaddress(validaddress)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("address"));
            return false;
        }
    };

    function cityControl() {
        //controler la city
        const validcity = contact.city
        if (regExfirstNamelastNamecity(validcity)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("city"));
            return false;
        }
    };

    function emailControl() {
        //controler l'email
        const validemail = contact.email
        if (regEemailail(validemail)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("email"));
            return false;
        }
    };
    

   if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
        //Mettre l'objet contact dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));

    } else {
      alert("Veuillez renseigner ce champ");
    return false;
    }

    //Mettre les valeurs du formulaire et les produits choisi ds un objet a envoyer vers le serveur
    const sendValueAndProducts = {
        products,
        contact,
    };
    console.log(sendValueAndProducts);

    //Envoyer l'objet sendValueAndProducts vers le serveur
        const responsePost = fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        body: JSON.stringify(sendValueAndProducts),
        headers: {

            'Accept': "application/json",
            "Content-Type": "application/json",

        },

    });

     //Voir le resultat du serveur dans la console 
     responsePost.then(async (response) => {
        try {
            const contenu = await response.json();
            console.log("contenus");
            console.log(contenu);
                localStorage.clear();
                localStorage.setItem("contenuId", contenu.orderId);
                document.location.href = "confirmation.html";

        }
        catch (err) {
           alert(`err`); 
        }
               console.log(responsePost);


     
 });


});


//let form = document.querySelector(".cart__order__form");
//console.log(form);

//Mettre le contenu du localStorage dans les champs du formulaire
//Chercher la key dans le localstroge et la mettre ds une variable
const dataLocalStorage = localStorage.getItem("contact");

//Convertir la chaine de caractère en objet js
const objetData = JSON.parse(dataLocalStorage);
//console.log(objetData);

 if (objetData => null) {
        console.log("null");
 } else {

    document.querySelector(`#firstName`).value = objetData.firstName;
    document.querySelector(`#lastName`).value = objetData.lastName;
    document.querySelector(`#address`).value = objetData.address;
    document.querySelector(`#city`).value = objetData.city;
    document.querySelector(`#email`).value = objetData.email;

 }







   















//router.get('/:id', productCtrl.getOneProduct);
//methode window.location.search
const getInformation = window.location.search;
console.log(getInformation);

//methode constructor URLSearchParams pour extraire l'id
const kanapId = new URLSearchParams(getInformation);
console.log(kanapId);

const id = kanapId.get("id");
console.log(id);


//afficher les détails du produit 
let fetchId = fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => {
     selectedElements = promise;
        console.log(selectedElements);
               
  
document.getElementById("title").innerHTML = `
    ${selectedElements.name}`

document.getElementById("price").innerHTML = `
    ${selectedElements.price}`

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

        //Récupérer la quantité et la couleur
        //Convertir le nombre (chaîne) en Integer 
        let numberQuantity = parseInt(quantity.value)
        
        if(numberQuantity<=0){
            alert("Veuillez SVP choisir un nombre d'article entre 1..100");
        
        }else if(color.value==""){
            alert("Veuillez SVP choisir une couleur");
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
            };

                console.log(optionsProduct);



//Gestion du LocaleStorage--------------
//Stocker les valeurs dans le local storage
//convertir données json (dans lecalstorage) en objet js
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    console.log(productInLocalStorage);

//Function pour une fenêtre pop-up
//Methode window.confirm
const confirmation = () => {
    if (window.confirm(`Votre commande de ${selectedElements.name} 
    ${selectedElements.colors}  
    est ajoutee au panier
    Pour consulter votre panier, cliquez sur OK`)) {
        window.location.href = "cart.html";
    }
};


// récupération des informations du produit dans le stockage
let itemInfoOnStorage = getItemInfoOnStorage(
    optionsProduct,
    productInLocalStorage
);

// actions en fonction de la présence du produit dans le local storage
if (!productInLocalStorage) {
//Si il n'y pas de produit enregistr� dan le Locale storage
    productInLocalStorage = [];
    productInLocalStorage.push(optionsProduct);
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.log("localstorage après modification (depuis vide)", productInLocalStorage);
        confirmation();
       
       
} else if (itemInfoOnStorage.isItemOnStorage) {
// on incrémente la quantité du produit existant dans le storage
    productInLocalStorage[itemInfoOnStorage.storageIndex].quantity +=
    optionsProduct.quantity;
        console.log("panier après incrémentation de la quantité", productInLocalStorage);
          
        //mettre à jour la clé product dans le localStorage
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            confirmation();


} else if (itemInfoOnStorage.isIdOnStorage) {
// on ajoute le produit en dessus des produits similaires
    productInLocalStorage.splice(
    itemInfoOnStorage.storageIndex, 0, optionsProduct);
        console.log("ajout de l'article au bon endroit", productInLocalStorage);
          
// on met à jour la clé product dans le localStorage
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        confirmation();


} else {
//Ajouter le produit choisi dans localstorage
    productInLocalStorage.push(optionsProduct);


//Ajouter les options et choix du client //Transformer en format JSON
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.log("localstorage après modification (depuis existant)",productInLocalStorage);
        confirmation();
}
}
});
});

//Conditions selon l'id et la couleur
//préciser si l’article (même identifiant et même couleur) est déjà là
//spécifier si un article similaire est dans le panier (même ID mais couleur différente)
//donner l’index sur le panier 

function getItemInfoOnStorage(item, storage) {
  
      //Définir la valeur par défaut de la variable qui spécifie si l’élément se trouve sur le localstorage
      let itemInfoOnStorage = {
        storageIndex: 0,
        isIdOnStorage: false,
        isItemOnStorage: false,
      };

      //variable pour compter le nombre de boucles
      let loopCount = 0;

      // Boucle jusqu’à ce que l’élément ou un élément similaire soit trouvé
      if (storage) {
            while (
              itemInfoOnStorage.isItemOnStorage === false &&
              itemInfoOnStorage.isIdOnStorage === false &&
              loopCount < storage.length
            ) {
    
      // Si l’élément du même identifiant et même couleur est là
      if (
              storage[loopCount].id === item.id &&
              storage[loopCount].color === item.color
              ) {
      
              //Avoir l'index du stokage
              itemInfoOnStorage.storageIndex = loopCount;

              //Si il est présent :isItemOnStorage = true
                itemInfoOnStorage.isItemOnStorage = true;
              }

       //Si élément similar du meme id et de couleur differente est la
       else if (storage[loopCount].id === item.id) {
      
              //Obtenir index
              itemInfoOnStorage.storageIndex = loopCount;

              //Si il est present : isIdOnStorage = true
                itemInfoOnStorage.isIdOnStorage = true;
              }

              //compteur de boucle d’incrémentation
              loopCount++;
            }
          }
                console.log("Info de l'article dans le panier", itemInfoOnStorage);

          //Si l'élément est ds le LocaleStorage: = return itemInfoOnStorage 
             return itemInfoOnStorage;
    }
