getItems();

// Requete API
function getItems() {
    fetch('http://localhost:3000/api/products')
        .then((response) => response.json()) 
        .then((datas) => {
            // Intégration des données de l'API dans le DOM
            datas.forEach(data => {
                console.log(2, data);
                // Le lien de la page "product" contenant l'id produit
                let productLink = document.createElement('a');
                document.querySelector('.items').appendChild(productLink);
                productLink.href += `product.html?id=${data._id}`;

                // L'<article> contenant l'image, le nom et la description du produit
                let productArticle = document.createElement('article');
                productLink.appendChild(productArticle);

                // L'<img>
                let productImg = document.createElement('img');
                productArticle.appendChild(productImg);
                productImg.src = data.imageUrl;
                productImg.alt = data.altTxt;

                // Le <h3>
                let productName = document.createElement('h3');
                productArticle.appendChild(productName);
                productName.classList.add('productName');
                productName.innerHTML = data.name;

                // L'élément <p> contenant la description
                let productDescription = document.createElement('p');
                productArticle.appendChild(productDescription);
                productDescription.classList.add('productDescription');
                productDescription.innerHTML = data.description;  
            
            });
        }) 
    .catch((err) => {
        alert(`Problème réseau : ${err}`);  
    });  
}
