// Tranformer la chaine de caractère en JSON
let productsInCart = JSON.parse(localStorage.getItem('products'));
console.log(1, productsInCart);


getInCart();
totalItems();
qtyInput();
orderForm();
postDataForm();

// Création des items du panier
function getInCart() {
    const cartItemId = document.querySelector('#cart__items');
    // Si le panier est vide
    if (productsInCart === null || productsInCart == 0) {
        cartItemId.innerText = 'Votre panier est vide';
    } else {
        let productArrayCopy = [];
        console.log(2,productArrayCopy);
        // Vérifier si l'id et la couleur sont les memes ou pas 
        productsInCart.forEach(product => {
            // Si l'article ajouté n'a pas le meme id et color alors il est ajouté au panier
            if(compareCurrProduct(productArrayCopy, product)) {
                productArrayCopy.push(product);
                console.log(3,compareCurrProduct(productArrayCopy, product))
            // Mais si c'est le cas c'est juste la qté qui change
            } else {
                productArrayCopy.forEach(currProduct => {
                    if(product.articleId === currProduct.articleId && product.articleColor === currProduct.articleColor) {
                        currProduct.articleQuantity = currProduct.articleQuantity + product.articleQuantity;
                    }
                });
            }
        });
        productsInCart = productArrayCopy;
            
        // Générer les éléments du panier dans DOM
        productsInCart.forEach(product => {
            // L'<article>
            let elementArticle = document.createElement('article');
            document.querySelector('#cart__items').appendChild(elementArticle);
            elementArticle.classList.add = 'cart__item';
            elementArticle.setAttribute('data-id', `${product.articleId}-${product.articleColor}`);

            // La div contenant l'image
            let elementDivImg = document.createElement('div');
            elementArticle.appendChild(elementDivImg);
            elementDivImg.classList.add('cart__item__img');

            // L'image 
            let elementImg = document.createElement('img');
            elementDivImg.appendChild(elementImg);
            elementImg.src = product.articleImg;
            elementImg.alt = product.articleAltTxt;

            // La div 'cart__item__content'
            let elementDivContent = document.createElement('div');
            elementArticle.appendChild(elementDivContent);
            elementDivContent.classList.add('cart__item__content');

            // La div contenant le prix et le nom du produit
            let elementDivContentTitlePrice = document.createElement('div');
            elementDivContent.appendChild(elementDivContentTitlePrice);
            elementDivContentTitlePrice.classList.add('cart__item__content__titlePrice');

            // Le nom du produit
            let elementTitle = document.createElement('h2');
            elementDivContentTitlePrice.appendChild(elementTitle);
            elementTitle.innerHTML = product.articleName;

            // Le prix
            let elementPrice = document.createElement('p');
            elementDivContentTitlePrice.appendChild(elementPrice);
            elementPrice.innerHTML = product.articlePrice + " €";

            // La div 'cart__item__content__settings'
            let elementDivSettings = document.createElement('div');
            elementDivContent.appendChild(elementDivSettings);
            elementDivSettings.classList.add('cart__item__content__settings');

            // La div contenant le texte de qté et la couleur
            let elementDivSettingsQty = document.createElement('div');
            elementDivSettings.appendChild(elementDivSettingsQty);
            elementDivSettingsQty.classList.add('cart__item__content__settings__quantity');

            // La couleur
            let elementColor = document.createElement('p');
            elementDivSettingsQty.appendChild(elementColor);
            elementColor.innerHTML = product.articleColor;

            // Le texte de qté
            let elementQty = document.createElement('p');
            elementDivSettingsQty.appendChild(elementQty);
            elementQty.innerHTML = 'Quantité : ';

            // Insérer la quantité avec l'élément input
            let elementQtyInput = document.createElement('input');
            elementDivSettingsQty.appendChild(elementQtyInput);
            elementQtyInput.classList.add('itemQuantity');
            elementQtyInput.value = product.articleQuantity;
            elementQtyInput.setAttribute('type', 'number');
            elementQtyInput.setAttribute('name', 'itemQuantity');
            elementQtyInput.setAttribute('min', "1");
            elementQtyInput.setAttribute('max', '100')

            // La div contenant l'option de suppression
            let elementDelete = document.createElement('div');
            elementDivSettings.appendChild(elementDelete);
            elementDelete.classList.add('cart__item__content__settings__delete'); 

            // L'élément de suppression
            let elementDeleteItm = document.createElement('p');
            elementDelete.appendChild(elementDeleteItm);
            elementDeleteItm.className = 'deleteItem';
            elementDeleteItm.innerHTML = 'Supprimer';
        });
    }
    deleteItem();
}

// Fonction qui permettra de comparer un nouveau tableau à celui contenant les produits du LS
function compareCurrProduct(productArray, currProduct) {
    let exist = true;
    // Si le tableau n'est pas vide
    if(productArray.length > 0) {
        // Si au moins un élément existe 
        exist = !productArray.some(product => currProduct.articleId === product.articleId && currProduct.articleColor === product.articleColor);   
    }console.log(4,exist)
    return exist;  
}


// Récupérer le total des articles et du prix 
function totalItems() {
     
    // Ajouter la quantité totale
    let elementTotalQty = document.getElementById('totalQuantity');
    const totalQty = productsInCart.reduce((accumulator, current) => accumulator + parseInt(current.articleQuantity, 10), 0);
    elementTotalQty.innerHTML = totalQty;
    
    // Ajouter le prix total
    let elementTotalPrice = document.getElementById('totalPrice');
    const totalPrice = productsInCart.reduce((accumulator, current) => accumulator + current.articlePrice * current.articleQuantity, 0);
    elementTotalPrice.innerHTML = totalPrice;   
}

// Changer la quantité d'articles via le panier
function qtyInput() {
    const listInputItemQty = document.querySelectorAll('.itemQuantity');

    listInputItemQty.forEach(input => { // Récupérer les données de l'input 
        // Ecoute  du click de l'input afin de changer la qté
        input.addEventListener('click', (event) => {
           
            // Récupérer l'id et la couleur séparés par un -
            const dataItem = event.target.closest("article").dataset.id.split('-');
            
            // Récupérer la valeur de l'input, donc la qté contenue à l'intérieur
            const newQty = event.target.value; // C'est une référence à l'objet qui a envoyé l'événement

           // Actualiser productsInCart
            productsInCart.forEach(item => {
                
                // Si l'artcileId est = à celui de l'input et que l'articleColor = à celle de l'input
                if(item.articleId === dataItem[0] && item.articleColor === dataItem[1]) {
                    item.articleQuantity = newQty; // Alors on change la quantité de productsInCart en la qté de l'input 
                }
            });
             
            // Actualiser le total
            totalItems();
        });
    
    });
}

//La suppression d'une ligne d'articles article
function deleteItem(){
    // Récuperation des balises p "Supprimer"
    const deleteButtons = document.querySelectorAll('.deleteItem');

    // Récupération des données de l'élément <p> 'supprimer'
    deleteButtons.forEach(btn => {
        // Pour chaque bouton supprimé, ajout d'un eventListener
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            // Récupération de l'id et de la couleur via l'<article>
            const dataItem = event.target.closest("article").dataset.id.split('-');
            console.log(5, dataItem);
            if(dataItem.length) {
                // Suppression de l'article correspondant
                productsInCart = productsInCart.filter(item => item.articleId !== dataItem[0] || item.articleColor !== dataItem[1]);
                console.log(6,productsInCart);
                
                // Suppression des anciens articles
                const itemsContainer = document.getElementById('cart__items');
                console.log(7,itemsContainer);
                while(itemsContainer.firstChild) {  
                    itemsContainer.removeChild(itemsContainer.firstChild);  
                       
                }
                // Actualisation de la liste d'article 
                getInCart();
                // Actualisation du total
                totalItems(); 
                // Actualisation du localStorage
                localStorage.setItem('products', JSON.stringify(productsInCart));    
            }   
            //Ajout d'une boîte de dialogue "alert"
            alert('Votre article a bien été supprimé')
        });
    });  
}

// Validation du formulaire
function orderForm() {
    const form = document.querySelector('.cart__order__form');
    
    // Ecouter la modification du Prénom
    form.firstName.addEventListener('change', function(){
        validFirstName(this);// Fonction qui écoute l'élément en cours d'écoute .this correspond à form.firstName
    });

    // Création de fonction qui a pour paramètre form.firstName
    const validFirstName = function(inputFirstName) {
        //Valider le format du prénom
        let regExpFirstName = new RegExp('^[a-zA-Z-]+$');
       
        // Récupération de la balise <p> '#firstNameErrorMsg'
        let firstName = inputFirstName.nextElementSibling;

         // Test de ce que l'utilisateur a saisi
        if(regExpFirstName.test(inputFirstName.value)) {
            firstName.innerHTML = '';
        } else {
            firstName.innerHTML = 'Votre Prénom ne doit contenir que des lettres';
        }
    };

    // Ecouter la modification du Nom
    form.lastName.addEventListener('change', function(){
        validLastName(this);
    });

    // Création de la reg exp pour la validation du nom
    const validLastName = function(inputLastName) {
        let regExpLastName = new RegExp('^[a-zA-Z-]+$');
        
        // Récupération de la balise <p> '#lastNameErrorMsg'
        let lastName = inputLastName.nextElementSibling;

        // Test de l'expression régulière
        if(regExpLastName.test(inputLastName.value)) {
            lastName.innerHTML = '';
        } else {
            lastName.innerHTML = 'Votre Nom ne doit contenir que des lettres';
        }
    };

    // Ecouter la modification de l'Adresse
    form.address.addEventListener('change', function(){
        validAddress(this);
    });

    // Création de la reg exp pour la validation de l'adresse
    validAddress = function(inputAddress) {
        let regExpAddress = new RegExp('^[A-Za-z0-9- ]*$');
    
        // Récupération de la balise <p> '#addressErrorMsg'
        let address = inputAddress.nextElementSibling;

        // Test de l'expression régulière
        if(regExpAddress.test(inputAddress.value)) {
            address.innerHTML = '';
        } else {
            address.innerHTML = 'Votre adresse n\'est pas valide';
        }
    };

    // Ecouter la modification de la ville
    form.city.addEventListener('change', function(){
        validCity(this);
    });
    
    // Création de la reg exp pour la validation de la ville
    const validCity = function(inputCity) {
        let regExpCity = new RegExp('^[a-zA-Z-]+$');

        // Récupération de la balise <p> '#cityErrorMsg'
        let city = inputCity.nextElementSibling;

        // Test de l'expression régulière
        if(regExpCity.test(inputCity.value)) {
            city.innerHTML = '';
        } else {
            city.innerHTML = 'Votre ville ne doit contenir que des lettres';
        }
    };
    
    // Ecouter la modification de l'email
    form.email.addEventListener('change', function(){
        validEmail(this);
    });

    // Création de la reg exp pour la validation de l'email
    const validEmail = function(inputEmail) {
        let regExpEmail = new RegExp(
            '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
            );
        
        // Récupération de la balise <p> '#emailErrorMsg'
        let email = inputEmail.nextElementSibling;
        
        // Test de l'expression régulière
        if(regExpEmail.test(inputEmail.value)) {
            email.innerHTML = ''; 
        } else {
            email.innerHTML = 'Veuillez renseigner un e-mail valide';
        }
    };
}

// Envoi des informations du formulaire
function postDataForm(){
    const orderBtn = document.querySelector('#order');
    const formOrder = document.getElementsByClassName('cart__order__form');
    
    formOrder[0].addEventListener('submit', (event) => {
        // Annulation de l'envoi du formulaire par défaut
        event.preventDefault();
    });
    orderBtn.addEventListener('click', () => {
        // Stocker les données saisies dans le local storage
        const inputFirstName = document.querySelector('#firstName').value;
        const inputLastName = document.querySelector('#lastName').value;
        const inputAddress = document.querySelector('#address').value;
        const inputCity = document.querySelector('#city').value;
        const inputEmail = document.querySelector('#email').value;
        
        // Créer un tableau qui contient les produits sélectionnés 
        let productsOrdered = [];
        productsInCart.forEach(article => {
            productsOrdered.push(article.articleId);
        });
        console.log(6, productsOrdered)

        // Créer un objet qui contient les infos du client et les produits sélectionnés 
        const order = {
            contact : {
                firstName : inputFirstName,
                lastName : inputLastName,
                address : inputAddress,
                city : inputCity,
                email : inputEmail,
            },
            products : productsOrdered,
        }
        console.log(7, order);

        // Envoi de la requete POST
        const postRequest = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 
                'Content-Type': 'application/json'
            }
        };  

        fetch('http://localhost:3000/api/products/order',postRequest)
        .then((response) => response.json()) 
        .then((datas) => {
            
            localStorage.setItem('orderId', datas.orderId);
            console.log(8, datas);
            
        })
        .catch((err) => {
            alert ("Problème réseau");  
        });
        // Redirection vers la page de confirmation
        //let confirmHref = `http://127.0.0.1:5500/front/html/confirmation.html`;
        //alert('Votre commande a bien été validée');
        //window.location = confirmHref;  
    });
}









