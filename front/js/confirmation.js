confirmationId();

// Initialisation de la fonction permettant de renvoyer le code de confirmation
function confirmationId() {
    const getOrderId = document.querySelector('#orderId');
    getOrderId.innerHTML = localStorage.getItem('orderId');
}