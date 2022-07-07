//let cart = []

retrieveProductCart()

function retrieveProductCart() {
//  console.log(localStorage.getItem('cart'))
  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :  [];
  
  if(cart.length === 0){
    return;
  }
    /* for (let i = 0; i < localStorage.length; i++) {
      const product = localStorage.getItem(localStorage.key(i))
      const productObjects = JSON.parse(product)
      cart.push(productObjects)
    } */
  cart.forEach((cart) => displayProductCart(cart))
}

function displayProductCart(cart) {
  const cartItem = document.createElement("article")
  cartItem.classList.add("cart__item")
  cartItem.setAttribute("data-id", cart.id)
  cartItem.setAttribute("data-color", cart.color)
  document.querySelector("#cart__items").appendChild(cartItem)

  const cartItemImg = document.createElement("div")
  cartItemImg.classList.add("cart__item__img")
  cartItem.appendChild(cartItemImg)

  const cartImg = document.createElement("img")
  cartImg.src = cart.imgSrc
  cartImg.alt = cart.imgAlt
  cartItemImg.appendChild(cartImg)
  
  const cartItemContent = document.createElement("div")
  cartItemContent.classList.add("cart__item__content")
  cartItem.appendChild(cartItemContent)

  const cartItemContentDescription = document.createElement("div")
  cartItemContentDescription.classList.add("cart__item__content__description")
  cartItemContent.appendChild(cartItemContentDescription)

  const cartProductName = document.createElement("h2")
  cartProductName.textContent = cart.productName
  cartItemContentDescription.appendChild(cartProductName)

  const cartItemColor = document.createElement("p")
  cartItemColor.textContent = cart.color
  cartItemContentDescription.appendChild(cartItemColor)

  const cartItemPrice = document.createElement("p")
  cartItemPrice.textContent = `${cart.price},00 €`
  cartItemContentDescription.appendChild(cartItemPrice)

  const cartItemContentSettings = document.createElement("div")
  cartItemContentSettings.classList.add("cart__item__content__settings")
  cartItemContent.appendChild(cartItemContentSettings)

  const cartItemContentSettingsQuantity = document.createElement("div")
  cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)

  const cartItemQuantityParagraph = document.createElement("p")
  cartItemQuantityParagraph.textContent = "Qté :"
  cartItemContentSettingsQuantity.appendChild(cartItemQuantityParagraph)

  const cartItemQuantity = document.createElement("input")
  cartItemQuantity.classList.add("itemQuantity")
  cartItemQuantity.setAttribute("type", "number")
  cartItemQuantity.setAttribute("name", "itemQuantity")
  cartItemQuantity.setAttribute("min", "1")
  cartItemQuantity.setAttribute("max", "100")
  cartItemQuantity.setAttribute("value", cart.quantity)
  cartItemContentSettingsQuantity.appendChild(cartItemQuantity)
  cartItemQuantity.addEventListener("change", () => changeProductQuantity(cart.id, cartItemQuantity.value, cart))

  const cartItemContentSettingsDelete = document.createElement("div")
  cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete")
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete)

  const deleteItem = document.createElement("p")
  deleteItem.classList.add("deleteItem")
  deleteItem.textContent = "Supprimer"
  cartItemContentSettingsDelete.appendChild(deleteItem)

  displayTotalPrice()
  displayTotalQuantity()
/*   cartTotalQuantity += parseInt(cartItemQuantity.value)
  displaytotalQuantity(cartTotalQuantity)

  let cartTotalPrice = 0
  cartTotalPrice = cartTotalQuantity * cart.price
  displayTotalPrice(cartTotalPrice)
  console.log(cartTotalPrice) */
}

function updateLocalStorage(product) {
  const orderData = JSON.stringify(product)
  //console.log("data", orderData)
  localStorage.setItem(cart.id, orderData)
} 

function changeProductQuantity(id, value, cart) {
  const productUpdate = cart.find((cart) => cart.id === id)
  productUpdate.quantity = value
  displayTotalPrice()
  displayTotalQuantity()
  updateLocalStorage(cart)
}

function displayTotalPrice() {
  let price = 0
  const displayPrice = document.getElementById("totalPrice")
  cart.forEach((cart) => {
  const totalPrice = cart.price * cart.quantity
  price += totalPrice
})
displayPrice.textContent = `${price},00`
}

function displayTotalQuantity() {
  let quantity = 0
  const displayQuantity = document.getElementById("totalQuantity")
  cart.forEach((cart) => {
    quantity += parseInt(cart.quantity)
  })
displayQuantity.textContent = quantity
}

/* function displayTotalPrice(cartTotalPrice) {
  const totalPrice = document.getElementById("totalPrice")
  totalPrice.textContent = cartTotalPrice
} */



/* function addAllProducts(cart) {
  cart.forEach((productObject) => {
    displayProduct(productObject)
  })
}

function displayProduct(productObject) {
  console.log(productObject)
} */

// -----------------------------------------------------------------------------------------

/* const orderBtn = document.getElementById("order")
orderBtn.addEventListener("click", (e) => submitForm(e))

function submitForm(e) {
  e.preventDefault()
  if (cart.length === 0) alert("Votre panier est vide !")
  const form = document.querySelector(".cart__order__form")
  const contact = orderForm()
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
  console.log(form.elements.firstName.value)
}

function orderForm() {
  const contact = {
    contact: {
      firstName: "tet",
      lastName: "tet",
      address: "tet",
      city: "tet",
      email: "tet"
      },
      products: ["tet"]
  }
  return contact
} */

const cartOrderForm = document.querySelector(".cart__order__form")
const cartOrderFormSubmit = document.querySelector(".cart__order__form__submit")

cartOrderForm.firstName.addEventListener("change", () => checkFirstName(firstName))

cartOrderForm.lastName.addEventListener("change", () => checkLastName(lastName))

cartOrderForm.address.addEventListener("change", () => checkAddress(address))

cartOrderForm.city.addEventListener("change", () => checkCity(city))

cartOrderForm.email.addEventListener("change", () => checkEmail(email))

function checkFirstName(firstName) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$")
  const test = regExp.test(firstName.value)
  const errorMsg = document.getElementById("firstNameErrorMsg")

  if (test) {
    errorMsg.textContent = " "
    return true
  } else {
    errorMsg.textContent = "Deux caractères minimum et utilisation de lettres uniquement."
    return false
  }
}

function checkLastName(lastName) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$")
  const test = regExp.test(lastName.value)
  const errorMsg = document.getElementById("lastNameErrorMsg")

  if (test) {
    errorMsg.textContent = " "
    return true
  } else {
    errorMsg.textContent = "Deux caractères minimum et utilisation de lettres uniquement."
    return false
  }
}

function checkAddress(address) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ0-9 ,.'-]{2,}$")
  const test = regExp.test(address.value)
  const errorMsg = document.getElementById("addressErrorMsg")

  if (test) {
    errorMsg.textContent = " "
    return true
  } else {
    errorMsg.textContent = "Deux caractères minimum et utilisation de lettres et chiffres uniquement."
    return false
  }
}

function checkCity(city) {
  const regExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$")
  const test = regExp.test(city.value)
  const errorMsg = document.getElementById("cityErrorMsg")

  if (test) {
    errorMsg.textContent = " "
    return true;
  } else {
    errorMsg.textContent = "Deux caractères minimum et utilisation de lettres uniquement."
    return false
  }
}

function checkEmail(email) {
  const regExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]")
  const test = regExp.test(email.value)
  const errorMsg = document.getElementById("emailErrorMsg")

  if (test) {
    errorMsg.textContent = " "
    return true
  } else {
    errorMsg.textContent = "Merci de respecter le format xx@xx.xx"
    return false
  }
}

function submitForm() {
  cartOrderFormSubmit.addEventListener("click", function (e) {
    e.preventDefault()

    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("lastName")
    const address = document.getElementById("address")
    const city = document.getElementById("city")
    const email = document.getElementById("email")

    if (
      checkFirstName(firstName) &&
      checkLastName(lastName) &&
      checkAddress(address) &&
      checkCity(city) &&
      checkEmail(email)
    ) {
      if (cart.length == 0) {
        alert("Votre panier est vide ! ")
      } else {
        sendOrderData()
        alert("Votre commande a bien été prise en compte !")
      }
    } else {
      alert("Merci de vérifier votre formulaire !")
    }
  });
}
submitForm()

function prepareOrderData() {
  const contactData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value
  }

  const idProducts = []
  for (let i = 0; i < cart.length; i++) {
    idProducts.push(cart[i].id)
  }

  const orderData = {
    products: idProducts,
    contact: contactData
  }
  console.log(orderData)
  return orderData
}

//envoyer les données du formulaire et les traiter
function sendOrderData() {
  const orderData = prepareOrderData()

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