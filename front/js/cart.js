let localS = JSON.parse(localStorage.getItem('products'));
console.log(1, localS);
const cartItemId = document.querySelector('#cart__items');

getInCart();
totalItems();
newQtyAndPrice();
deleteItem();

//Si le panier est vide 
function getInCart() {
    if (localS === null || localS == 0) {
        cartItemId.innerHTML = `Votre panier est vide`;
    } else {
        localS = [...localS.reduce((acc, curr) => {
            // Création d'une clé unique pour différencier les élements de meme id/color
            const key = curr.articleId + '-' + curr.articleColor;
            // Si n'existe pas alors je créer un nouvel objet avec quantity à 0 via l'element
            const item = acc.get(key) || Object.assign({}, curr, {
              articleQuantity: 0,
            });
            // J'ajoute les quantités entre elles
            item.articleQuantity += curr.articleQuantity;
            // Je retourne l'item avec la quantité actualisée
            return acc.set(key, item);
            }, new Map).values()];
            console.log(2, localS)

             for (let products in localS){
            //Creer l'article
            let elementArticle = document.createElement('article');
            document.querySelector('#cart__items').appendChild(elementArticle);
            elementArticle.classList.add = 'cart__item';
            elementArticle.setAttribute('data-id', localS[products].articleId)

            //Creer la div cart__item__img
            let elementDivImg = document.createElement('div');
            elementArticle.appendChild(elementDivImg);
            elementDivImg.classList.add('cart__item__img');

            //Creer l'image dans la div 'cart__item__img'
            let elementImg = document.createElement('img');
            elementDivImg.appendChild(elementImg);
            elementImg.src = localS[products].articleImg;
            elementImg.alt = localS[products].articleAltTxt;

            //Creer la div 'cart__item__content'
            let elementDivContent = document.createElement('div');
            elementArticle.appendChild(elementDivContent);
            elementDivContent.classList.add('cart__item__content');

            //Creer la div 'cart__item__content__titlePrice'
            let elementDivContentTitlePrice = document.createElement('div');
            elementDivContent.appendChild(elementDivContentTitlePrice);
            elementDivContentTitlePrice.classList.add('cart__item__content__titlePrice');

            //Creer le h2
            let elementTitle = document.createElement('h2');
            elementDivContentTitlePrice.appendChild(elementTitle);
            elementTitle.innerHTML = localS[products].articleName;

            //Creer l'element <p> contenant le prix
            let elementPrice = document.createElement('p');
            elementDivContentTitlePrice.appendChild(elementPrice);
            elementPrice.innerHTML = localS[products].articlePrice + " €";

            //Creer la div 'cart__item__content__settings'
            let elementDivSettings = document.createElement('div');
            elementDivContent.appendChild(elementDivSettings);
            elementDivSettings.classList.add('cart__item__content__settings');

            //Creer la div 'cart__item__content__settings__quantity'
            let elementDivSettingsQty = document.createElement('div');
            elementDivSettings.appendChild(elementDivSettingsQty);
            elementDivSettingsQty.classList.add('cart__item__content__settings__quantity');

            //Créer l'élement <p> contenant la couleur
            let elementColor = document.createElement('p');
            elementDivSettingsQty.appendChild(elementColor);
            elementColor.innerHTML = `Couleur : ${localS[products].articleColor}`;

            //Creer l'element <p> contenant le texte de quantité
            let elementQty = document.createElement('p');
            elementDivSettingsQty.appendChild(elementQty);
            elementQty.innerHTML = 'Quantité : ';

            //Insérer la quantité avec l'élément input
            let elementQtyInput = document.createElement('input');
            elementDivSettingsQty.appendChild(elementQtyInput);
            elementQtyInput.classList.add('itemQuantity');
            elementQtyInput.value = localS[products].articleQuantity;
            elementQtyInput.setAttribute('type', 'number');
            elementQtyInput.setAttribute('name', 'itemQuantity');
            elementQtyInput.setAttribute('min', "1");
            elementQtyInput.setAttribute('max', '100');

            //Créer la div 'cart__item__content__settings__delete' 
            let elementDelete = document.createElement('div');
            elementDivSettings.appendChild(elementDelete);
            elementDelete.classList.add('cart__item__content__settings__delete');//je peux transformer classlist.add par classname =

            //Créer l'élément '<p>' 'deleteItem' 
            elementDeleteItm = document.createElement('p');
            elementDelete.appendChild(elementDeleteItm);
            elementDeleteItm.className = 'deleteItem';
            elementDeleteItm.innerHTML = 'Supprimer';
            

            /*const totalLine = [localS[products].articleName, localS[products].articleColor, localS[products].articleQuantity];
            console.log(13, totalLine);
            const reducer = (accumulator, current) => accumulator + current;
            console.log(20, totalLine.reduce(reducer));*/
            
        }
    }
}



//Récupérer la quantité des articles sélectionnés via la page produits et de leur prix. 
function totalItems() {
    //Ajouter la quantité totale
    let elementTotalQty = document.getElementById('totalQuantity');
    const totalQty = localS.reduce((accumulator, current) => accumulator + current.articleQuantity, 0);
    elementTotalQty.innerHTML = totalQty;
    console.log(3,totalQty);

    //Ajouter le prix total
    let elementTotalPrice = document.getElementById('totalPrice');
    const totalPrice = localS.reduce((accumulator, current) => accumulator + current.articlePrice * current.articleQuantity, 0);
    elementTotalPrice.innerHTML = totalPrice;
    console.log(4,totalPrice); 
}

//Changer la quantité d'articles via le panier
// Modification d'une quantité de produit
function newQtyAndPrice() {
    let changeQty = document.querySelectorAll('.itemQuantity');
    for (let q = 0; q < changeQty.length; q++) {
        changeQty[q].addEventListener('change' , (event) => {
            
 
        });console.log(5, changeQty);  
        console.log(6, q);
        
    }
}


    //const newQty = localS.reduce((accumulator, current) => accumulator + current.articlePrice * current.articleQuantity, 0);
    //modifyQty.innerHTML = newQty;*/


//La suppression d'un article
function deleteItem(){
    const deleteBtn = document.querySelector('.deleteItem');
    let name = localS[products].articleName;
    
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            //Id, couleur et quantité du produit à supprimer
            const itemToDelete = [name, localS.articleColor, localS.articleQuantity];
            const reducer = (accumulator, current) => accumulator + current;
            for(let d = 0; d < itemToDelete; d++){
                var re = reducer;

            }
            console.log(7, itemToDelete);
            

            //Ajout d'une boîte de dialogue "alert"
            alert('Votre article a bien été supprimé')
           
        });
   
}

//Le formulaire
function orderForm() {
    let form = document.querySelector('.cart__order__form');
    let regExp = new RegExp('^[a-zA-Z-]+$');
    let regExpAddress = new RegExp('^([0-9]){1-4}?([a-zA-Zàâäéèêëïîôöùûüç-])+([0-9]{1-5})$');
    let regExpEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

    //Ecouter la modification du Prénom
    form.firstName.addEventListener('change', function(){
        validFirstName(this);
    });
    //Création de la reg exp pour la validation du prénom
    const validFirstName = function(inputFistName) {
        let regExpFirstName = new RegExp('^[a-zA-Z-]+$'
        );
    };

    //Ecouter la modification du Nom
    form.lastName.addEventListener('change', function(){
        validLastName(this);
    });
    //Création de la reg exp pour la validation du nom
    const validLastName = function(inputLastName) {
        let regExpFirstName = new RegExp('^[a-zA-Z-]+$'
        );
    };

    //Ecouter la modification de l'Adresse
    form.address.addEventListener('change', function(){
        validAddress(this);
    });
    //Création de la reg exp pour la validation de l'adresse
    const validAddress = function(inputAddress) {
        let regExpAddress = new RegExp('^([0-9]){1-4}?([a-zA-Zàâäéèêëïîôöùûüç-])+([0-9]{1-5})$'
        );
    };

    //Ecouter la modification de la ville
    form.city.addEventListener('change', function(){
        validCity(this);
    });
    //Création de la reg exp pour la validation de la ville
    const validCity = function(inputCity) {
        let regExpCity = new RegExp('^[a-zA-Z-]+$'
        );
    };
    
    //Ecouter la modification de l'email
    form.city.addEventListener('change', function(){
        validEmail(this);
    });
    //Création de la reg exp pour la validation de l'email
    const validCity = function(inputCity) {
        let regExpEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
        );
    };
}















/*let articleLocalStorage = JSON.parse(localStorage.getItem('products'));
console.log(articleLocalStorage);


//Si le panier est vide
function addArticle() {
    let articles = articleLocalStorage;
    for (let article in articles) {
        console.log(articleLocalStorage);

        //Injecter l'article
        let productArticle = document.createElement('article');
        document.querySelector('#cart__items').appendChild(productArticle);
        productArticle.className = 'cart__item';
        productArticle.setAttribute('data-id', articleLocalStorage[article].idProduct);
    };
    if (articleLocalStorage === null || articleLocalStorage === 0) {
        let cartEmpty = document.createElement('p');
            cart.appendChild(cartEmpty);
            cartEmpty.innerHTML = 'Votre panier est vide';
    }/*const articles = data;
    console.log(articles);
    articles.forEach(article => {
        console.log(articles);
    else {
        for (let article in articleLocalStorage) {
        //Injecter l'article
        let productArticle = document.createElement('article');
        document.querySelector('#cart__items').appendChild(productArticle);
        productArticle.className = 'cart__item';
        productArticle.setAttribute('data-id', articleLocalStorage[article].idProduct);
        }  
    }  
}*/


