const productImage = document.createElement("img");
const productName = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColors = document.getElementById("colors");
const btnCart = document.getElementById("addToCart");

const url = new URL(document.location);
const id = url.searchParams.get("id");

retrieveProductWithId();

//Récupération du produit via l'API selon son id passé dans l'URL
function retrieveProductWithId() {
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(product => displayProductDetails(product))
    .catch(error => alert(error = "Ce produit n'a pu être affiché, merci de bien vouloir contacter notre assistance."))
}

// Fonction permettant l'affichage via le DOM des détails du produit
function displayProductDetails(product) {
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
    document.querySelector(".item__img").appendChild(productImage);

    productName.textContent = product.name;

    productPrice.textContent = product.price;
    
    productDescription.textContent = product.description;

    product.colors.forEach((color) => {
        const productColorsOption = document.createElement("option");
        productColorsOption.value = color;
        productColorsOption.textContent = color;
        productColors.appendChild(productColorsOption);
    })
}

// Appel de la fonction checkCart au clique du bouton "Ajouter au panier"
btnCart.addEventListener("click", checkCart);

// Vérification des choix de couleurs et de quantité sélectionnés pour le produit
function checkCart(){
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    if (color === "" && quantity == 0){
        alert("Merci de choisir une couleur et une quantité supérieur à 0 !");
        return;
    } else if (color === ""){
        alert("Merci de choisir une couleur !");
        return;
    } else if (quantity == 0 || quantity > 100){
        alert("Merci de choisir une quantité comprise entre 1 et 100 !");
        return;
    }

    checkProductExist(cart, color, quantity);
}

//Vérification de l'existence ou non d'un produit de couleur similaire dans le panier (local storage)
function checkProductExist(cart, color, quantity) {
let test = parseInt(quantity);
let productUpdate = cart.find((cart) => cart.id === id && cart.color === color);
if (productUpdate != undefined) {
    quantity = test += parseInt(productUpdate.quantity);
    productUpdate.quantity = quantity;

    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = "cart.html";
} else {
    sendNewProduct(cart, color, quantity);
}
} 

//Envoi d'un produit non existant dans le panier (local storage)
function sendNewProduct(cart, color, quantity){

    cart.push({
        id: id,
        imgAlt : productImage.alt,
        imgSrc : productImage.src,
        productName: productName.textContent,
        color: color,
        quantity: quantity
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = "cart.html";
} 