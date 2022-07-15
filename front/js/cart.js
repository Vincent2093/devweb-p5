let cart = [];

//Récupération des produits depuis le panier (local storage)
function retrieveProductCart() {
  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :  [];

  if(cart.length === 0) {
    return;
  }

  cart.forEach((cart) => getPrice(cart));
  displayTotalQuantity();
}

retrieveProductCart();

//Récupération du prix des produits depuis l'API selon leurs id
function getPrice(cart) {
  fetch(`http://localhost:3000/api/products/${cart.id}`)
  .then(response => response.json())
  .then(product => {
    cart.price = product.price;
    displayProductCart(cart);
  })
  .catch(error => alert(error = "Notre site rencontre actuellement un problème, merci de bien vouloir contacter notre assistance."))
}

// Affichage via le DOM du détail des produits présents dans le panier (local storage)
function displayProductCart(cart) {
  const cartItem = document.createElement("article");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", cart.id);
  cartItem.setAttribute("data-color", cart.color);
  document.querySelector("#cart__items").appendChild(cartItem);

  const cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  cartItem.appendChild(cartItemImg);

  const cartImg = document.createElement("img");
  cartImg.src = cart.imgSrc;
  cartImg.alt = cart.imgAlt;
  cartItemImg.appendChild(cartImg);
  
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  cartItem.appendChild(cartItemContent);

  const cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemContentDescription);

  const cartProductName = document.createElement("h2");
  cartProductName.textContent = cart.productName;
  cartItemContentDescription.appendChild(cartProductName);

  const cartItemColor = document.createElement("p");
  cartItemColor.textContent = cart.color;
  cartItemContentDescription.appendChild(cartItemColor);

  const cartItemPrice = document.createElement("p");
  cartItemPrice.textContent = `${cart.price},00 €`;
  cartItemContentDescription.appendChild(cartItemPrice);

  const cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartItemContentSettings);

  const cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

  const cartItemQuantityParagraph = document.createElement("p");
  cartItemQuantityParagraph.textContent = "Qté :";
  cartItemContentSettingsQuantity.appendChild(cartItemQuantityParagraph);

  const cartItemQuantity = document.createElement("input");
  cartItemQuantity.classList.add("itemQuantity");
  cartItemQuantity.setAttribute("type", "number");
  cartItemQuantity.setAttribute("name", "itemQuantity");
  cartItemQuantity.setAttribute("min", "1");
  cartItemQuantity.setAttribute("max", "100");
  cartItemQuantity.setAttribute("value", cart.quantity);
  cartItemContentSettingsQuantity.appendChild(cartItemQuantity);
  cartItemQuantity.addEventListener("change", () => changeProductQuantity(cart.id, cart.color, cartItemQuantity.value));

  const cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";
  cartItemContentSettingsDelete.appendChild(deleteItem);
  deleteItem.addEventListener("click", () => deleteProduct(cart.id, cart.color));

  displayTotalPrice();
}

// Suppression d'un produit du panier
function deleteProduct(id, color) {
  const productDelete = cart.findIndex((cart) => cart.id === id && cart.color === color)
  cart.splice(productDelete, 1)
  updateLocalStorage()
  location.reload()
}

// Mise à jour du local storage après un changement de quantité ou une suppression de produit
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
} 

// Mise à jour de la quantité d'un produit
function changeProductQuantity(id, color, value) {
  const productUpdate = cart.find((cart) => cart.id === id && cart.color === color);
  productUpdate.quantity = value;
  displayTotalPrice();
  displayTotalQuantity();
  updateLocalStorage();
}

// Affiche du prix total du panier
function displayTotalPrice() {
  const displayPrice = document.getElementById("totalPrice");
  let total = 0;
  cart.forEach((product) => {
    if(undefined === product.price){
      return;
    }
    total += product.price * product.quantity;
  });
  displayPrice.textContent = `${total},00`;
}

// Affichage de la quantité totale de tous les produits du panier
function displayTotalQuantity() {
  let quantity = 0;
  const displayQuantity = document.getElementById("totalQuantity");
  cart.forEach((cart) => {
    quantity += parseInt(cart.quantity);
  });
displayQuantity.textContent = quantity;
}

// Formulaire de commande
const cartOrderForm = document.querySelector(".cart__order__form");
const cartOrderFormSubmit = document.getElementById("order");

// Prise en compte d'un changement de valeur dans l'un des éléments du formulaire
cartOrderForm.firstName.addEventListener("change", () => checkFirstName(firstName));
cartOrderForm.lastName.addEventListener("change", () => checkLastName(lastName));
cartOrderForm.address.addEventListener("change", () => checkAddress(address));
cartOrderForm.city.addEventListener("change", () => checkCity(city));
cartOrderForm.email.addEventListener("change", () => checkEmail(email));

// Vérification des informations renseignées dans l'élément firstName du formulaire
function checkFirstName(firstName) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$");
  const test = regExp.test(firstName.value);
  const errorMsg = document.getElementById("firstNameErrorMsg");

  if (test) {
    errorMsg.textContent = " ";
    return true;
  }

  errorMsg.textContent = "Deux caractères minimum et utilisation de lettres uniquement.";
  return false;
}

// Vérification des informations renseignées dans l'élément lastName du formulaire
function checkLastName(lastName) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$");
  const test = regExp.test(lastName.value);
  const errorMsg = document.getElementById("lastNameErrorMsg");

  if (test) {
    errorMsg.textContent = " ";
    return true;
  }

  errorMsg.textContent = "Deux caractères minimum et utilisation de lettres uniquement.";
  return false;
}

// Vérification des informations renseignées dans l'élément address du formulaire
function checkAddress(address) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ0-9 ,.'-]{2,}$");
  const test = regExp.test(address.value);
  const errorMsg = document.getElementById("addressErrorMsg");

  if (test) {
    errorMsg.textContent = " ";
    return true;
  }

  errorMsg.textContent = "Deux caractères minimum et utilisation de lettres et chiffres uniquement.";
  return false;
}

// Vérification des informations renseignées dans l'élément city du formulaire
function checkCity(city) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$");
  const test = regExp.test(city.value);
  const errorMsg = document.getElementById("cityErrorMsg");

  if (test) {
    errorMsg.textContent = " ";
    return true;
  }

  errorMsg.textContent = "Deux caractères minimum et utilisation de lettres uniquement.";
  return false;
}

// Vérification des informations renseignées dans l'élément email du formulaire
function checkEmail(email) {
  const regExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]");
  const test = regExp.test(email.value);
  const errorMsg = document.getElementById("emailErrorMsg");

  if (test) {
    errorMsg.textContent = " ";
    return true;
  }

  errorMsg.textContent = "Merci de respecter le format xx@xx.xx";
  return false;
}

// Appel de la fonction submitForm au clique du bouton "Commander !"
cartOrderFormSubmit.addEventListener("click", (e) => submitForm(e));

// Vérification de la présence d'au moins un produit dans le panier et de toutes les informations renseignées dans le formulaire
function submitForm(e) {
    e.preventDefault();
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");

    if (cart.length === 0) {
      alert("Votre panier est vide ! ");
    } else if (
      checkFirstName(firstName) &&
      checkLastName(lastName) &&
      checkAddress(address) &&
      checkCity(city) &&
      checkEmail(email)
    ) {
      sendOrderData();
      alert("Votre commande a bien été prise en compte !");
    } else {
      alert("Merci de vérifier votre formulaire !");
    }
}

// Préparation des données du formulaire et du panier avant envoi à l'API
function prepareOrderData() {
  const contactData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value
  }

  const productId = []
  for (let i = 0; i < cart.length; i++) {
    productId.push(cart[i].id);
  }

  const orderData = {
    products: productId,
    contact: contactData
  }
  return orderData;
}

// Envoi des données à l'API
function sendOrderData() {
  const orderData = prepareOrderData();

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => window.location.replace(`confirmation.html?order=${data.orderId}`))
  .catch(error => alert(error = "Nous avons rencontré un soucis avec votre commande, merci de bien vouloir contacter notre assistance."))
}