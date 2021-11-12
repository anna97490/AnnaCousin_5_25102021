getItems();

// Requete API
function getItems() {
    fetch('http://localhost:3000/api/products')
    .then((response) => response.json()) 
    .then((datas) => {
        console.log(1, datas);
    // Intégration des données dans le DOM
        //const articles = datas;
        datas.forEach(data => {
            console.log(2, data);
            // Injecter le lien
            let productLink = document.createElement('a');
            document.querySelector('.items').appendChild(productLink);
            productLink.href = `product.html?id=${data['_id']}`;

            // Injecter l'article
            let productArticle = document.createElement('article');
            productLink.appendChild(productArticle);

            // Injecter l'image
            let productImg = document.createElement('img');
            productArticle.appendChild(productImg);
            productImg.src = data.imageUrl;
            productImg.alt = data.altTxt;

            // Injecter le titre
            let productName = document.createElement('h3');
            productArticle.appendChild(productName);
            productName.classList.add('productName');
            productName.innerHTML = data.name;

            // Injecter de la description
            let productDescription = document.createElement('p');
            productArticle.appendChild(productDescription);
            productDescription.classList.add('productDescription');
            productDescription.innerHTML = data.description;  
        });
    });  
}
