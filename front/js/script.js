getItems();

// Requete API
function getItems() {
    fetch('http://localhost:3000/api/products')
    .then((response) => response.json()) 
    .then((datas) => {
        console.log(1, datas);

    // Intégration des données dans le DOM
        datas.forEach(data => {
            console.log(2, data);
            // Le lien qui de la page "products" contenant l'id produit
            let productLink = document.createElement('a');
            document.querySelector('.items').appendChild(productLink);//------->.items ou #items
            productLink.href = `product.html?id=${data['_id']}`;

            // L'article contenant les éléments "img", "h3", "p" 
            let productArticle = document.createElement('article');
            productLink.appendChild(productArticle);

            // L'image
            let productImg = document.createElement('img');
            productArticle.appendChild(productImg);
            productImg.src = data.imageUrl;
            productImg.alt = data.altTxt;

            // Le titre
            let productName = document.createElement('h3');
            productArticle.appendChild(productName);
            productName.classList.add('productName');
            productName.innerHTML = data.name;

            // La description
            let productDescription = document.createElement('p');
            productArticle.appendChild(productDescription);
            productDescription.classList.add('productDescription');
            productDescription.innerHTML = data.description;  
        });
    });  
}
