let order = localStorage.getItem('orderId');
confirmationId();

// Initialisation de la fonction permettant de renvoyer le code de confirmation
function confirmationId() {
    const getOrderId = document.querySelector('#orderId');
    getOrderId.innerHTML = order;
    console.log(getOrderId);
}