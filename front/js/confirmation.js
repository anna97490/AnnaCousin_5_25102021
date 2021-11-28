
// Récupération de l'ordeId et affichage
const getOrderId = document.querySelector('#orderId');
getOrderId.innerHTML = localStorage.getItem('orderId');
console.log(1,getOrderId);
