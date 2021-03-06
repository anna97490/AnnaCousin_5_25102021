// Tranformer la chaine de caractère en JSON
let productsInCart = JSON.parse(localStorage.getItem('products'));

let cartItemId = document.querySelector('#cart__items');
let firstElement = cartItemId.childNodes[1];
firstElement.remove();

// Check pour le formulaire
let isFormValid = false;

getInCart();
totalItems();
qtyInput();
orderForm();
postDataForm();

// Création des items du panier
function getInCart() {
    // Si le panier est vide
    if (productsInCart == null || productsInCart == 0) {
        cartItemId.innerText = 'Votre panier est vide';
    } else {
        let productArrayCopy = [];
        // Vérifier si l'id et la couleur sont les memes ou pas 
        productsInCart.forEach(product => {
            // Si l'article ajouté n'a pas le meme id et color alors il est ajouté au panier
            if(compareCurrProduct(productArrayCopy, product)) {
                productArrayCopy.push(product);
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
        productsInCart.forEach((product) => {
            // L'<article>
            let article = document.createElement('article');
            document.querySelector('#cart__items').appendChild(article);
            article.classList.add('cart__item');
            article.setAttribute('data-id', `${product.articleId}-${product.articleColor}`);

            // La <div> contenant l'image
            let divImg = document.createElement('div');
            article.appendChild(divImg);
            divImg.classList.add('cart__item__img');

            // L'image 
            let img = document.createElement('img');
            divImg.appendChild(img);
            img.src = product.articleImg;
            img.alt = product.articleAltTxt;

            // La div 'cart__item__content'
            let divTwo = document.createElement('div');
            article.appendChild(divTwo);
            divTwo.classList.add('cart__item__content');

            // La div contenant le prix et le nom du produit
            let divThree = document.createElement('div');
            divTwo.appendChild(divThree);
            divThree.classList.add('cart__item__content__titlePrice');

            // Le nom du produit
            let title = document.createElement('h2');
            divThree.appendChild(title);
            title.innerHTML = product.articleName;

            // Le prix
            let price = document.createElement('p');
            divThree.appendChild(price);
            price.innerHTML = product.articlePrice + " €";

            // La div 'cart__item__content__settings'
            let divFour = document.createElement('div');
            divTwo.appendChild(divFour);
            divFour.classList.add('cart__item__content__settings');

            // La div contenant le texte de qté et la couleur
            let divFive = document.createElement('div');
            divFour.appendChild(divFive);
            divFive.classList.add('cart__item__content__settings__quantity');

            // La couleur
            let color = document.createElement('p');
            divFive.appendChild(color);
            color.innerHTML = product.articleColor;

            // Le texte de qté
            let qty = document.createElement('p');
            divFive.appendChild(qty);
            qty.innerHTML = 'Qté : ';

            // Insérer la quantité avec l'élément input
            let qtyInput = document.createElement('input');
            divFive.appendChild(qtyInput);
            qtyInput.classList.add('itemQuantity');
            qtyInput.setAttribute('type', 'number');
            qtyInput.setAttribute('name', 'itemQuantity');
            qtyInput.setAttribute('min', "1");
            qtyInput.setAttribute('max', '100');
            qtyInput.value = product.articleQuantity;

            // La div contenant l'option de suppression
            let divSix = document.createElement('div');
            divFour.appendChild(divSix);
            divSix.classList.add('cart__item__content__settings__delete'); 

            // L'élément de suppression
            let deleteBtn = document.createElement('p');
            divSix.appendChild(deleteBtn);
            deleteBtn.classList.add('deleteItem');
            deleteBtn.innerHTML = 'Supprimer'; 
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
    }
    return exist;  
}


// Récupérer le total des articles et du prix 
function totalItems() {
     if (productsInCart !== null && productsInCart.length > 0) {
         // Ajouter la quantité totale
         const elementTotalQty = document.querySelector('#totalQuantity');
         const totalQty = productsInCart.reduce((accumulator, current) => accumulator + parseInt(current.articleQuantity, 10), 0);
         elementTotalQty.innerHTML = totalQty;
         
         // Ajouter le prix total
         const elementTotalPrice = document.querySelector('#totalPrice');
         const totalPrice = productsInCart.reduce((accumulator, current) => accumulator + current.articlePrice * current.articleQuantity, 0);
         elementTotalPrice.innerHTML = totalPrice;   
     }
}

// Changer la quantité d'articles via le panier
function qtyInput() {
    const listInputItemQty = document.querySelectorAll('.itemQuantity');
    listInputItemQty.forEach(input => { // Récupérer les données de l'input 
        // Ecoute  du click de l'input afin de changer la qté
        input.addEventListener('click', (event) => {
           
            // Récupérer l'id et la couleur dans un nouveau tableau
            const dataItem = event.target.closest("article").dataset.id.split('-');
            
            // Récupérer la valeur de l'input, donc la qté contenue à l'intérieur
            const newQty = event.target.value; // C'est une référence à l'objet qui a envoyé l'événement

           // Actualiser productsInCart
            productsInCart.forEach(item => {
                // Si l'id et la couleur correspondent alors la qté est actualisée
                if(item.articleId === dataItem[0] && item.articleColor === dataItem[1]) {
                    item.articleQuantity = newQty; 
                }
            });
            // Actualiser le total
            totalItems();
        });
    
    });
}

//La suppression d'une ligne d'articles article
function deleteItem(){
    // Récuperation de toutes les références vers tous les boutons supprimer de chaque article
    const deleteButtons = document.querySelectorAll('.deleteItem');
    // Récupération des données de l'élément <p> 'supprimer'
    deleteButtons.forEach(btn => {
        // Pour chaque bouton supprimé, ajout d'un eventListener
        btn.addEventListener('click', (event) => {
            
            // Récupération de l'id et de la couleur via l'<article>
            const articleToDelete = event.target.closest("article");//---l'id à supprimer est ici
            const dataItem = articleToDelete.dataset.id.split('-');
            
            // Si cet élément existe
            if(dataItem.length > 0) {
                // Création d'un nouveau tableau trié qui permettra de faire l'actualisation du total du prix et de la qté
                // Je garde uniquement les articles ayant un id différent de celui qui a été cliqué
                productsInCart = productsInCart.filter(item => item.articleId !== dataItem[0] || item.articleColor !== dataItem[1]);
                
                // Suppression de l'ancien article dans le DOM
                articleToDelete.remove();
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
        form.firstName.addEventListener('change', () => {
        // Valider le format du prénom
        let regExpFirstName = new RegExp('^[a-zA-Z-àâäéèêëïîôöùûüç]+$');
    
        // Récupération de la balise <p> '#firstNameErrorMsg'
        let firstName = form.firstName.nextElementSibling;

        // Test de ce que l'utilisateur a saisi
        if(regExpFirstName.test(form.firstName.value)) {
            firstName.innerHTML = '';
            isFormValid = true;
        } else {
            firstName.innerHTML = 'Votre Prénom ne doit contenir que des lettres';
            isFormValid = false;
        }
    });

    // Ecouter la modification du Nom
    form.lastName.addEventListener('change', () => {
        let regExpLastName = new RegExp('^[a-zA-Z-àâäéèêëïîôöùûüç]+$');
        
        // Récupération de la balise <p> '#lastNameErrorMsg'
        let lastName = form.lastName.nextElementSibling;

        // Test de l'expression régulière
        if(regExpLastName.test(form.lastName.value)) {
            lastName.innerHTML = '';
            isFormValid = true;
        } else {
            lastName.innerHTML = 'Votre Nom ne doit contenir que des lettres';
            isFormValid = false;
        }
    });

    // Ecouter la modification de l'Adresse
    form.address.addEventListener('change', () => {
    // Création de la reg exp pour la validation de l'adresse
        let regExpAddress = new RegExp('^[A-Za-z0-9-àâäéèêëïîôöùûüç ]*$');
    
        // Récupération de la balise <p> '#addressErrorMsg'
        let address = form.address.nextElementSibling;

        // Test de l'expression régulière
        if(regExpAddress.test(form.address.value)) {
            address.innerHTML = '';
            isFormValid = true;
        } else {
            address.innerHTML = 'Votre adresse n\'est pas valide';
            isFormValid = false;
        }
    });

    // Ecouter la modification de la ville
    form.city.addEventListener('change', () => {
    // Création de la reg exp pour la validation de la ville
        let regExpCity = new RegExp('^[a-zA-Z-àâäéèêëïîôöùûüç]+$');

        // Récupération de la balise <p> '#cityErrorMsg'
        let city = form.city.nextElementSibling;

        // Test de l'expression régulière
        if(regExpCity.test(form.city.value)) {
            city.innerHTML = '';
            isFormValid = true;
        } else {
            city.innerHTML = 'Votre ville ne doit contenir que des lettres';
            isFormValid = false;
        }
    });
    
    // Ecouter la modification de l'email
    form.email.addEventListener('change', () => {
        // Création de la reg exp pour la validation de l'email
        let regExpEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        
        // Récupération de la balise <p> '#emailErrorMsg'
        let email = form.email.nextElementSibling;
        
        // Test de l'expression régulière
        if(regExpEmail.test(form.email.value)) {
            email.innerHTML = ''; 
            isFormValid = true;
        } else {
            email.innerHTML = 'Veuillez renseigner un e-mail valide';
            isFormValid = false;
        }
    });
}

// Envoi des informations du formulaire
function postDataForm(){
    const orderBtn = document.querySelector('#order');
    const formOrder = document.querySelector('.cart__order__form');
    
    formOrder.addEventListener('submit', (event) => {
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
        
        if((inputFirstName && isFormValid) && (inputLastName && isFormValid) && (inputAddress && isFormValid) && (inputCity && isFormValid)  && (inputEmail && isFormValid)) {
        let productsOrdered = [];
        productsInCart.forEach(article => {
            productsOrdered.push(article.articleId);
        });

        // Créer un objet qui contient les infos du client et les produits id
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

        // Envoi de la requete POST
        const postRequest = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            }
        };  

        fetch('http://localhost:3000/api/products/order', postRequest)
        .then((response) => response.json()) 
        .then((datas) => {
            localStorage.setItem('orderId', datas.orderId);
            localStorage.removeItem('products');

            // Redirection vers la page de confirmation
            let confirmHref = `http://127.0.0.1:5500/front/html/confirmation.html`;
            alert('Votre commande a bien été validée');
            window.location = confirmHref; 
        })
        .catch((err) => {
            alert (`Problème réseau : ${err}`);
        }); 
    } 
    });
}









