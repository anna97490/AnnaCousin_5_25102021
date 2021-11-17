// Accéder à l'argument id de la requête GET contenu dans l'URL.
let url = new URL(window.location.href).searchParams.get('id');
console.log(url);
let idProduct = url;



getProduct();

// Requete API
function getProduct() {
    fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(res => res.json()) 
    .then(product => {
        console.log(1, product);
        // Intégration des données dans le DOM
        // L'image
        let productImg = document.createElement('img');
        document.querySelector('.item__img').appendChild(productImg);
        productImg.src = product.imageUrl;
        productImg.alt = product.altTxt;

        // Injecter le titre
        document.querySelector('#title').innerHTML = product.name;

        // Injecter le prix
        document.querySelector('#price').innerHTML = product.price;

        // Injecter la description
        document.querySelector('#description').innerHTML = product.description;

        // Les couleurs
        product.colors.forEach(color => {
            console.log(2, color);
            let productColors = document.createElement('option');
            document.querySelector('#colors').appendChild(productColors);
            productColors.value = color;
            productColors.innerHTML = color;
        });
        addToCart(product);
    });
}

function addToCart(product) {
    const btnAddToCart = document.querySelector('#addToCart');
    const colorSelection = document.querySelector('#colors');
    const qtySelection = document.querySelector('#quantity');

    // Ecouter le click afin d'envoyer les articles sélectionnés dans le panier
    btnAddToCart.addEventListener('click', () => {
        let colorChoice = colorSelection.value;
        let qtyChoice = qtySelection.value;

        // Si la quantité d'articles est comprise entre 0 et 100
        if ( qtyChoice > 0 && qtyChoice < 100){
            
            // Création de l'objet qui contient les infos des articles
            let productOptions = {
                articleId : idProduct,
                articleColor : colorChoice,
                articleQuantity : Number(qtyChoice),
                articleName : product.name,
                articleDescription : product.description,
                articlePrice : product.price,
                articleImg : product.imageUrl,
                articleAltTxt : product.altTxt
            }; console.log(3, productOptions);

            // Initialisation du local storage
            let articleStorage = [];
            
            // Récupération de la clé 'products'
            let itemStorage = localStorage.getItem('products');
            console.log(4, itemStorage)
 
            if (itemStorage !== null) { // S'il y a déja des articles dans le local storage, pour ne pas les écrase
                articleStorage = JSON.parse(itemStorage);
                articleStorage.push(productOptions);
                localStorage.setItem('products', JSON.stringify(articleStorage)); // Actualisation de la valeur de 'products' et transfromer en chaine de caracteres 'articleStorage'
                console.log(5, JSON.parse(localStorage.getItem('products')));
            }
            else { 
                articleStorage.push(productOptions);
                localStorage.setItem('products', JSON.stringify(articleStorage)); // JS en JSON
                console.log(6, articleStorage);
            };
            alert('Votre article a bien été ajouté au panier');
        };
    });
}
            




