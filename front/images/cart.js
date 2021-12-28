//let test = localStorage.setItem("productInLocalStorage");

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

    function firstNameControl() {
        //controler de la validité du prenom
        const validPrenom = valueForm.Prenom;
        if (regExPrenomNomVille(validPrenom)) {
            firstNameErrorMsg.innerHTML = '';
            return true;

        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("Prenom"));
            return false;
        }
    }

    function lastNameControl() {
        //controler le nom
        const validNom = valueForm.Nom;
        if (regExPrenomNomVille(validNom)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("Nom"));
            return false;
        }
    }

    function addressControl() {
        //controler  l'adresse
        const validAdresse = valueForm.Adresse;
        if (regExAdresse(validAdresse)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("Adresse"));
            return false;
        }
    };

    function cityControl() {
        //controler la ville
        const validVille = valueForm.Ville;
        if (regExPrenomNomVille(validVille)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("Ville"));
            return false;
        }
    };

    function emailControl() {
        //controler l'email
        const validemail = valueForm.Email;
        if (regExemail(validemail)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            alert(alertFalse("Email"));
            return false;
        }
    };


    if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
        //Mettre l'objet valueForm dans le local storage
        localStorage.setItem("valueForm", JSON.stringify(valueForm));

    } else {
        alert("Veuillez renseigner ce champ");
        return false;
    }

    //Mettre les valeurs du formulaire et les produits choisi ds un objet a envoyer vers le serveur
    const sendValueAndProducts = {
        productInLocalStorage,
        valueForm,
    };
    console.log(sendValueAndProducts);

    console.log(sendValueAndProducts);


    fetch('https://cors-demo.glitch.me/allow-cors', { mode: 'cors' })

    const responsePost = fetch(`http://localhost:3000/api/products/order, options`,  {
        method: "POST",
        body: JSON.stringify(sendValueAndProducts),
        headers: {
            Accept: "application/json",
            "Content.Type": "application/json",


        },


    })
    //Voir le resultat du serveur dans la console 
    responsePost.then(async (response) => {
        try {

            const contenu = await response.json();
            console.log(contenu);
        }
        catch (e) {
            console.log(e);
        }
    })

    //voir le contenu du serveur
    const responsePost2 = fetch(`http://localhost:3000/api/products/order, options`)
    responsePost2.then(async (response) => {
        try {

            const dataServeur = await response.json();
            console.log(dataServeur);
            if (response.ok) {
                console.log(`Resutlat de response.ok : *${response.ok}`);
            }

        }
        catch (e) {
            console.log(e);
        }
    })



})

//let form = document.querySelector(".cart__order__form");
//console.log(form);

//Mettre le contenu du localStorage dans les champs du formulaire
//Chercher la key dans le localstroge et la mettre ds une variable
const dataLocalStorage = localStorage.getItem("valueForm");
console.log(dataLocalStorage);

//Convertir la chaine de caractère en objet js
const objetData = JSON.parse(dataLocalStorage);
console.log(objetData);

//Remplir le champ du formulaire avec les valeurs (les donnees)du local storage 
function fullIn() {
    if (objetData => null) {
        console.log("null");
    } else {


        document.querySelector(`#firstName`).value = objetData.Prenom;
        document.querySelector(`#lastName`).value = objetData.Nom;
        document.querySelector(`#address`).value = objetData.Adresse;
        document.querySelector(`#city`).value = objetData.Ville;
        document.querySelector(`#email`).value = objetData.Email;

    }
}
console.log(objetData);