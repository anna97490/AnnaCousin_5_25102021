// Récupérer l'Id du produit 
let currentUrl = window.location.href;
let idForUrl = new URL(currentUrl).searchParams.get('id');
let idProduct = idForUrl;

getProduct();

// Requete API
function getProduct() {
    // // Appel du produit à l'API
    fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(res => res.json()) 
    .then(article => {
        console.log(1, article);

        // Injecter l'image
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

        // Injecter les couleurs
        article.colors.forEach(color => {
            console.log(2, color);
            let productColors = document.createElement('option');
            document.querySelector('#colors').appendChild(productColors);
            productColors.value = color;
            productColors.innerHTML = color;
        });
        addToCart(article);
    })
    .catch((err) => {
        alert ("Problème réseau");  
    });  
}

// Ajout des articles dans le panier
function addToCart(articleToCart) {
    const btnAddToCart = document.querySelector('#addToCart');
    console.log(3, localStorage);
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
            let productOptions = {
                articleId : idProduct,
                articleColor : colorChoice,
                articleQuantity : Number(quantityChoice),
                articleName : articleToCart.name,
                articleDescription : articleToCart.description,
                articlePrice : articleToCart.price,
                articleImg : articleToCart.imageUrl,
                articleAltTxt : articleToCart.altTxt
            }; console.log(4, productOptions);

            // Initialisation du local storage
            let articleLocalStorage = [];
            // Récupérer la clé 'products'
            let itemStorage = localStorage.getItem('products'); 

            // S'il y a déja des articles dans le local storage
            if (itemStorage !== null) { // S'il y a déja des articles dans le local storage, pour ne pas les écraser
                articleLocalStorage = JSON.parse(itemStorage); // analyse la donnée JSON et construit la valeur JS
                articleLocalStorage.push(productOptions);
                localStorage.setItem('products', JSON.stringify(articleLocalStorage)); // Actualise le local storage
            }
            else { // Si le local storage est vide
                articleLocalStorage.push(productOptions);
                // Actualiser le local storage
                localStorage.setItem('products', JSON.stringify(articleLocalStorage)); 
                console.log(5, articleLocalStorage);
            };
            // Redirection vers le panier
            let productHref = `http://127.0.0.1:5500/front/html/cart.html`;
            if (confirm('Votre produit a bien été ajouté. Souhaitez-vous accéder à votre panier?')){
                window.location = productHref;
            } else {
                window.location 
            }
        };
    });
}
            




