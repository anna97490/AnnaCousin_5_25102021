/*async function apiCallProduct(){
    var productFetch = await fetch(`http://localhost:3000/api/products/${idProduct}`)
    return await productFetch.json();
}

async function getProduct(){
    var result = await apiCallProduct().then(function (data){
        const articles = data;
        console.log(articles);
        articles.forEach(article => {
            console.log(articles);
        });
    });
}*/

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var idProduct = url.searchParams.get('id');

const colorSelection = document.querySelector('#colors');
const quantitySelection = document.querySelector('#quantity');

getProduct();

//Requete API
function getProduct() {
    fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(res => {
        return res.json();
    }).then(article => {
        console.log(article);

        //Injecter l'image
        let productImg = document.createElement('img');
        document.querySelector('.item__img').appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        //Injecter le titre
        document.querySelector('#title').innerHTML = article.name;

        //Injecter le prix
        document.querySelector('#price').innerHTML = article.price;

        //Injecter la description
        document.querySelector('#description').innerHTML = article.description;

        //Injecter les couleurs
        for (let colors of article.colors){
            console.log(colors);
            let productColors = document.createElement('option');
            document.querySelector('#colors').appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        }
        addToCart(article);
    });
}

//Ajout dans le panier
function addToCart(article) {
    const btnAddToCart = document.querySelector('#addToCart');

    btnAddToCart.addEventListener('click', (event) => {
        if (quantitySelection.value > 0 && quantitySelection.value < 100){
            let colorChoice = colorSelection.value;
            let quantityChoice = quantitySelection.value;

            //Creation de l'article qui pourra etre ajoute dans le panier
            let productOptions = {
                articleId : idProduct,
                articleColor : colorChoice,
                articleQuantity : Number(quantityChoice),
                articleName : article.name,
                articleDescription : article.description,
                articlePrice : article.price,
                articleImg : article.imageUrl,
                articleAltTxt : article.altTxt
            }; console.log(productOptions);

            //Le local storage
            let articleLocalStorage = [];

            //S'il y a deja des articles dans le local storage
            if (localStorage.getItem('products') !== null) {
                articleLocalStorage = JSON.parse(localStorage.getItem('products'));
                articleLocalStorage.push(productOptions);
                localStorage.setItem('products', JSON.stringify(articleLocalStorage));
                console.log(5, JSON.parse(localStorage.getItem('products')));
            }
            else { // Si le local storage est vide
                    articleLocalStorage.push(productOptions);
                    localStorage.setItem('products', JSON.stringify(articleLocalStorage));
                    console.log(articleLocalStorage);
            };
        };
    });
}
            

        /*//S'il y a deja des articles dans le local storage
        if (localStorage.getItem("products") !== null) {
            articleLocalStorage = JSON.parse(localStorage.getItem('products'));
            console.log(articleLocalStorage);
        }
        else {
            articleLocalStorage.push(productOptions);
            localStorage.setItem('products', JSON.stringify(articleLocalStorage));
        }*/

        /*//Le Local Storage
        let articleLocalStorage = [];
        
        if (localStorage.getItem("products") !== null) {
            articleLocalStorage = JSON.parse(localStorage.getItem("products"));
        }
        articleLocalStorage.push(productOptions);
        localStorage.setItem("products", JSON.stringify(articleLocalStorage));
    });
}*/




