let currentUrl = window.location.href;
let url = new URL(currentUrl).searchParams.get('id');
let idProduct = url;

const colorSelection = document.querySelector('#colors');
const quantitySelection = document.querySelector('#quantity');

getProduct();

// Requete API
function getProduct() {
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
        article.colors.forEach(colors => {
            console.log(2, colors);
            let productColors = document.createElement('option');
            document.querySelector('#colors').appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        });
        addToCart(article);
    });
}

// Ajout des articles dans le panier
function addToCart(article) {
    const btnAddToCart = document.querySelector('#addToCart');

    btnAddToCart.addEventListener('click', () => {
        // Si la quantité d'articles est comprise entre 0 et 100
        if (quantitySelection.value > 0 && quantitySelection.value < 100){
            let colorChoice = colorSelection.value;
            let quantityChoice = quantitySelection.value;

            // Création de l'article qui pourra etre ajouté dans le panier
            let productOptions = {
                articleId : idProduct,
                articleColor : colorChoice,
                articleQuantity : Number(quantityChoice),
                articleName : article.name,
                articleDescription : article.description,
                articlePrice : article.price,
                articleImg : article.imageUrl,
                articleAltTxt : article.altTxt
            }; console.log(3, productOptions);

            // Initialisation du local storage
            let articleLocalStorage = [];

            // S'il y a déja des articles dans le local storage
            if (localStorage.getItem('products') !== null) {
                articleLocalStorage = JSON.parse(localStorage.getItem('products'));
                articleLocalStorage.push(productOptions);
                localStorage.setItem('products', JSON.stringify(articleLocalStorage));
                console.log(4, JSON.parse(localStorage.getItem('products')));
            }
            else { // Si le local storage est vide
                    articleLocalStorage.push(productOptions);
                    localStorage.setItem('products', JSON.stringify(articleLocalStorage));
                    console.log(5, articleLocalStorage);
            };
        };
    });
}
            




