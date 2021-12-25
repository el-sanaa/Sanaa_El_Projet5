
//---------------Affichage des produits------------------



//Mettre dans variable keys et values qui sont dans le localstorage
//Convertir donn�es JSON du localstorage en format js

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
        '<p>Cart is empty</p>';

    cartsPosition.innerHTML = emptyCart;

    } else {
 // sinon afficher produits dans le localstorage
 //boucle for
    
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


//Gestion du prix total
//Mettre ds la Variable cree totalsPrice les prix qui sont ds le panier
let totalsPrice = [];

//Chercher les prix ds le panier
//Boucle for
for (let p = 0; p < productInLocalStorage.length; p++) {
    let priceProduct = productInLocalStorage[p].price;

    //Mettre le prix ds la variable priceProduct
    totalsPrice.push(priceProduct)
        console.log(totalsPrice);

    //Methode .reduce pour additionner les prix
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = totalsPrice.reduce(reducer, 0);
      
    //Mettre les prix ds la variable 
    let totalsProduct = document.getElementById('totalPrice');
    totalsProduct.innerHTML = total;
        console.log(total);
}


//Gestion de la quantite de produit
let totalsQuantity = [];

for (let q = 0; q < productInLocalStorage.length; q++) {
    let quantityProduct = productInLocalStorage[q].quantity;

    totalsQuantity.push(quantityProduct);
    console.log(totalsQuantity);

    //Methode .reduce pour additionner les prix
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totals = totalsQuantity.reduce(reducer, 0);

    //Mettre les prix ds la variable 
    let quantities = document.getElementById("totalQuantity");
    quantities.innerHTML = totals;
    console.log(totals);
}


//Gestion de la modification du produit

let oneModification = document.querySelectorAll(".itemQuantity");
console.log(oneModification);

for (let m = 0; m < oneModification.length; m++) {
    oneModification[m].addEventListener("click", (event) => {
        event.preventDefault();

        //Selection de l'element � modifier en fonction de son id ET sa couleur
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




//------------6estion du formulaire

const orders = document.querySelector("#order");
console.log(orders);

//Ecouter le click
orders.addEventListener("click", (e) => {
    e.preventDefault();

    //methode construtor,creer une class pour fabriquer l'objet 
    //et y mettre les valeurs du formulaire
    class constructorObjet {
        constructor() {
            this.Prenom = document.querySelector("#firstName").value;
            this.Nom = document.querySelector("#lastName").value;
            this.Adresse = document.querySelector("#address").value;
            this.Ville = document.querySelector("#city").value;
            this.Email = document.querySelector("#email").value;

        }
    }

    //Appeler class constructor => pour creer l'objet valueForm
    const valueForm = new constructorObjet();
    console.log(valueForm);



    //----------Gestion du formulaire
    const alertFalse = (value) => {
        return `${value}: Veuillez renseigner ce champ`;
    }

    
    //Expression régulière
    const regExPrenomNomVille = (value) => {
        return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
    }

   const regExemail = (value) => {
       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }

    const regExAdresse = (value) => {
        return /^[A-Za-z0-9\s]{1,50}$/.test(value);
    }

    const alertFalse = (value) => {
        return `${value}: Veuillez renseigner ce champ`;
    }

        //controler la validation du prenom
        function firstNameControl() {
            const validPrenom = valueForm.Prenom
            if(regExPrenomNomVille(validPrenom)){
                 document.querySelector("#firstNameErrorMsg").textContent = "";
                return true;
            }else{
                document.querySelector("#firstNameErrorMsg").textContent = "Veuillez renseigner ce champ";
                alert(alertFalse("Prenom"));
                return false;
            }
        };

        //controler la validation du nom
        function lastNameControl() {
            const validNom = valueForm.Nom
            if(regExPrenomNomVille(validNom)){
                document.querySelector("#lastNameErrorMsg").textContent = "";
                return true;
            }else{
                document.querySelector("#lastNameErrorMsg").textContent = "Veuillez renseigner ce champ";
                alert(alertFalse("Nom"));
                return false;
            }
        };

         //controler la validation de ville
        function cityControl() {
            const validVille = valueForm.Ville;
            if (regExPrenomNomVille(validVille)) {
                  document.querySelector("#cityErrorMsg").textContent = "";
                 return true;
            } else {
                document.querySelector("#cityErrorMsg").textContent = "Veuillez renseigner ce champ";
                 alert(alertFalse("Ville"));
                 return false;
            }
        };

        //controler  la validation de l'adresse
        function addressControl() {
            const validAdresse = valueForm.Adresse;
            if (regExAdresse(validAdresse)) {
                  document.querySelector("#addressErrorMsg").textContent = "";
                 return true;
            } else {
                 document.querySelector("#addressErrorMsg").textContent = "Veuillez renseigner ce champ";
                 alert("Adresse : Veuillez renseigner ce champ");
                 return false;
            }
        };
       
         //controler la validation de l'email
        function emailControl() {
            const validemail = valueForm.Email;
            if (regExemail(validemail)) {
                   document.querySelector("#emailErrorMsg").textContent = "";
                  return true;
            } else {
                  document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner ce champ";
                  alert("Email : Veuillez renseigner ce champ");
                  return false;
            }
        };

        if (firstNameControl() && lastNameControl() && cityControl() && addressControl() && emailControl()) {
        //Mettre l'objet valueForm dans le local storage
        localStorage.setItem("valueForm", JSON.stringify(valueForm));
     
        } else {
             return false;
        }


    //Mettre les valeurs du formulaire et les produits choisi ds un objet a envoyer vers le serveur
    const sendValueAndProducts = {
        productInLocalStorage,
        valueForm,
    };
    console.log(sendValueAndProducts);

   
    //Envoyer l'objet sendValueAndProducts vers le serveur
    const responsePost = fetch(`http://localhost:3000/api/products`, {
        method: "POST",
        body: JSON.stringify(),
        headers: {
           
            "Content-Type": "application/json",


        },

    });
   
    console.log(responsePost);



});
   
//Mettre le contenu du localStorage dans les champs du formulaire
//Chercher la key dans le localstroge et la mettre ds une variable
const dataLocalStorage = localStorage.getItem("valueForm");

//Convertir la chaine de caractère en objet js
const objetData = JSON.parse(dataLocalStorage);
//console.log(objetData);

 if (objetData => null) {
        console.log("null");
 } else {

    document.querySelector(`#firstName`).value = objetData.Prenom;
    document.querySelector(`#lastName`).value = objetData.Nom;
    document.querySelector(`#address`).value = objetData.Adresse;
    document.querySelector(`#city`).value = objetData.Ville;
    document.querySelector(`#email`).value = objetData.Email;

        }



    
    


   









    

   







