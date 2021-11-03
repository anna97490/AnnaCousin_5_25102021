let localS = JSON.parse(localStorage.getItem('products'));
console.log(localS);
const cartItemId = document.querySelector('#cart__items');

//Si le panier est vide 
function getInCart() {
    
    if (localS === null || localS == 0) {
        cartItemId.innerHTML = `Votre panier est vide`;
    } else {


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
        }
    }
}
getInCart();

function totalItems() {
    //Ajouter la quantité totale
    var elementTotalQty = document.getElementById('totalQuantity');
    const totalQty = localS.reduce((accumulator, item) => accumulator + item.articleQuantity, 0);
    elementTotalQty.innerHTML = totalQty;
    console.log(totalQty);

    //Ajouter le prix total
    const totalPrice = localS.reduce((accumulator, item) => accumulator + item.articlePrice *  item.articleQuantity, 0);
    let itemTotalPrice = document.getElementById('totalPrice');
    itemTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice); 
}
totalItems();














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


