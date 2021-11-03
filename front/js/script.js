productContent();

//Requete API
async function apiCall(){
    var productCatch = await fetch('http://localhost:3000/api/products')
    return await productCatch.json();
}

//Intégration des données dans le DOM
async function productContent(){
    var result = await apiCall().then(function (data){
        const articles = data;
        console.log(articles);
        articles.forEach(article => {
            console.log(articles);

            //Injecter le lien
            let productLink = document.createElement('a');
            document.querySelector('.items').appendChild(productLink);
            productLink.href = `product.html?id=${article['_id']}`;

            //Creer l'article
            let productArticle = document.createElement('article');
            productLink.appendChild(productArticle);

            //Creer de l'image
            let productImg = document.createElement('img');
            productArticle.appendChild(productImg);
            productImg.src = article.imageUrl;
            productImg.alt = article.altTxt;

            //Injecter le titre
            let productName = document.createElement('h3');
            productArticle.appendChild(productName);
            productName.classList.add('productName');
            productName.innerHTML = article.name;

            //Injecter de la description
            let productDescription = document.createElement('p');
            productArticle.appendChild(productDescription);
            productDescription.classList.add('productDescription');
            productDescription.innerHTML = article.description;
        });
    
    }).catch((error) => {
        console.log("Erreur");
    });
}