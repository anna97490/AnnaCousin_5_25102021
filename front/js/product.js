// Récupérer l'Id du produit 
let currentUrl = window.location.href;
let idForUrl = new URL(currentUrl).searchParams.get('id');
let idProduct = idForUrl;

getProduct();

// Requete API
function getProduct() {
    // Appel des données du produit à l'API
    fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(res => res.json()) 
    .then(article => {
        console.log(44, article);
        const itemImg = document.querySelector('.item__img');
        console.log(1, itemImg);

        let img = itemImg.firstElementChild;
        console.log(2, img);
        img.src = article.imageUrl;
        img.alt = article.altTxt;

        // Injecter le titre
        document.querySelector('#title').innerHTML = article.name;

        // Injecter le prix
        document.querySelector('#price').innerHTML = article.price;

        // Injecter la description
        document.querySelector('#description').innerHTML = article.description;

        article.colors.forEach(color => {
            const colors = document.querySelector('#colors');
            console.log(3, colors);
            let colorsTxt = colors.firstElementChild;
            console.log(4, colorsTxt);
            let colorsOptions = colorsTxt.nextElementSibling;
            console.log(5, colorsOptions);
            colorsOptions.value = color;
            colorsOptions.innerHTML = color;
           
        })
        /*// L'image
        let productImg = document.createElement('img');
        document.querySelector('.item__img').appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        // Injecter le titre
        document.querySelector('#title').innerHTML = article.name;

        // Injecter le prix
        document.querySelector('#price').innerHTML = article.price;

        // Injecter la description
        document.querySelector('#description').innerHTML = article.description;

        // Les couleurs
        article.colors.forEach(color => {
            console.log(2, color);
            let productColors = document.createElement('option');
            document.querySelector('#colors').appendChild(productColors);
            productColors.value = color;
            productColors.innerHTML = color;
        });*/
        addToCart(article);
    })
    .catch((err) => {
        alert (`Problème réseau : ${err}`);  
    });  
}

// Ajout des articles dans le panier
function addToCart(articleToCart) {
    const btnAddToCart = document.querySelector('#addToCart');

    // Ecouter l'évènement du clic
    btnAddToCart.addEventListener('click', () => {
        const colorSelection = document.querySelector('#colors');
        const qtySelection = document.querySelector('#quantity');

        // Récupérer la couleur et la qté pour les sélectionner et les envoyer avec l'objet
        let colorChoice = colorSelection.value;
        let quantityChoice = qtySelection.value;
        
        // Si la quantité d'articles est comprise entre 0 et 100
        if (qtySelection.value > 0 && qtySelection.value < 100) {
            
            // Création de l'objet qui pourra etre ajouté dans le panier
            const productOptions = {
                articleId : idProduct,
                articleColor : colorChoice,
                articleQuantity : Number(quantityChoice),
                articleName : articleToCart.name,
                articleDescription : articleToCart.description,
                articlePrice : articleToCart.price,
                articleImg : articleToCart.imageUrl,
                articleAltTxt : articleToCart.altTxt
            }; 

            // Initialisation du local storage
            let articleLocalStorage = [];
            // Récupérer la clé 'products'
            let itemStorage = localStorage.getItem('products'); 

            // S'il y a déja des articles dans le local storage
            if(itemStorage !== null) { 
                articleLocalStorage = JSON.parse(itemStorage); // Analyse la donnée JSON et construit la valeur JS
                articleLocalStorage.push(productOptions);
                localStorage.setItem('products', JSON.stringify(articleLocalStorage)); // Actualise le local storage
            }
            else { // Si le local storage est vide
                articleLocalStorage.push(productOptions);
                // Actualiser le local storage
                localStorage.setItem('products', JSON.stringify(articleLocalStorage)); 
            };
            // Redirection vers le panier
            let cartHref = `http://127.0.0.1:5500/front/html/cart.html`;
            if(confirm('Votre produit a bien été ajouté. Souhaitez-vous accéder à votre panier?')){
                window.location = cartHref;
            } else {
                window.location; 
            }
        };
    });
}
            




