function submitForm() {

    if (cart.length === 0) {
        alert("Votre panier est vide ! ")
        return
    }
    
    if (isFormInvalid()) return
    if (isEmailInvalid()) return
}