const url = new URL(document.location);
const id = url.searchParams.get("order");

displayOrderId();

// Affichage de l'id de commande passé dans l'URL
function displayOrderId() {
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.textContent = id;
    clearLocalStorage();
}

//Suppression des éléments du panier (local storage)
function clearLocalStorage() {
    localStorage.clear();
}