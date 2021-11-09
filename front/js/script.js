getItems();

// Requete API
function getItems() {
    fetch('http://localhost:3000/api/products')
    .then(function (response) {
        return response.json();
    }).then(function (data) {
    // Intégration des données dans le DOM
        const articles = data;
        articles.forEach(article => {
            console.log(1, data);
            console.log(2, article);

            // Injecter le lien
            let productLink = document.createElement('a');
            document.querySelector('.items').appendChild(productLink);
            productLink.href = `product.html?id=${article['_id']}`;

            // Injecter l'article
            let productArticle = document.createElement('article');
            productLink.appendChild(productArticle);

            // Injecter l'image
            let productImg = document.createElement('img');
            productArticle.appendChild(productImg);
            productImg.src = article.imageUrl;
            productImg.alt = article.altTxt;

            // Injecter le titre
            let productName = document.createElement('h3');
            productArticle.appendChild(productName);
            productName.classList.add('productName');
            productName.innerHTML = article.name;

            // Injecter de la description
            let productDescription = document.createElement('p');
            productArticle.appendChild(productDescription);
            productDescription.classList.add('productDescription');
            productDescription.innerHTML = article.description;
        });
    });  
}
