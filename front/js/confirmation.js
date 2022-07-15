const url = new URL(document.location);
const id = url.searchParams.get("order");

// Affichage de l'id de commande passé dans l'URL
function displayOrderId() {
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.textContent = id;
    clearLocalStorage();
}

displayOrderId();

//Suppression des éléments du panier (local storage)
function clearLocalStorage() {
    localStorage.clear();
}