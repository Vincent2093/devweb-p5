const cart = []

retrieveProductCart()
cart.forEach((product) => displayProductCart(product))

function retrieveProductCart() {
    for (let i = 0; i < localStorage.length; i++) {
      const product = localStorage.getItem(localStorage.key(i))
      const productObjects = JSON.parse(product)
      cart.push(productObjects)
    }
}

/* color: "Silver"
id: "034707184e8e4eefb46400b5a3774b5f"
imgAlt: "Photo d'un canapé rouge, deux places"
imgSrc: "http://localhost:3000/images/kanap07.jpeg"
price: "1999"
productName: "Kanap Thyoné"
quantity: "9" */

function displayProductCart(product) {
  const cartItem = document.createElement("article")
  cartItem.classList.add("cart__item")
  cartItem.setAttribute("data-id", product.id)
  cartItem.setAttribute("data-color", product.color)
  document.querySelector("#cart__items").appendChild(cartItem)

  const cartItemImg = document.createElement("div")
  cartItemImg.classList.add("cart__item__img")
  cartItem.appendChild(cartItemImg)

  const cartImg = document.createElement("img")
  cartImg.src = product.imgSrc
  cartImg.alt = product.imgAlt
  cartItemImg.appendChild(cartImg)
  
  const cartItemContent = document.createElement("div")
  cartItemContent.classList.add("cart__item__content")
  cartItem.appendChild(cartItemContent)

  const cartItemContentDescription = document.createElement("div")
  cartItemContentDescription.classList.add("cart__item__content__description")
  cartItemContent.appendChild(cartItemContentDescription)

  const cartProductName = document.createElement("h2")
  cartProductName.textContent = product.productName
  cartItemContentDescription.appendChild(cartProductName)

  const cartItemColor = document.createElement("p")
  cartItemColor.textContent = product.color
  cartItemContentDescription.appendChild(cartItemColor)

  const cartItemPrice = document.createElement("p")
  cartItemPrice.textContent = `${product.price},00 €`
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
  cartItemQuantity.setAttribute("value", product.quantity)
  cartItemContentSettingsQuantity.appendChild(cartItemQuantity)

  const cartItemContentSettingsDelete = document.createElement("div")
  cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete")
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete)

  const deleteItem = document.createElement("p")
  deleteItem.classList.add("deleteItem")
  deleteItem.textContent = "Supprimer"
  cartItemContentSettingsDelete.appendChild(deleteItem)
}


/* function addAllProducts(cart) {
  cart.forEach((productObject) => {
    displayProduct(productObject)
  })
}

function displayProduct(productObject) {
  console.log(productObject)
} */