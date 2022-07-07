const url = new URL(document.location)
const id = url.searchParams.get("order")

displayOrderId(id)

function displayOrderId(id) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = id
    clearLocalStorage()
}

function clearLocalStorage() {
    localStorage.clear()
}