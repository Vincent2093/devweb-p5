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
  document.querySelector("#cart__items").appendChild(cartItem)
  cartItem.classList.add("cart__item")
  cartItem.setAttribute("data-id", product.id)
  cartItem.setAttribute("data-color", product.color)

  const cartItemImg = document.createElement("div")
  cartItem.appendChild(cartItemImg)
  cartItemImg.classList.add("cart__item__img")

  const cartImg = document.createElement("img")
  cartItemImg.appendChild(cartImg)
  cartImg.src = product.imgSrc
  cartImg.alt = product.imgAlt
  
  const cartItemContent = document.createElement("div")
  cartItem.appendChild(cartItemContent)
  cartItemContent.classList.add("cart__item__content")

  const cartItemContentDescription = document.createElement("div")
  cartItemContent.appendChild(cartItemContentDescription)
  cartItemContentDescription.classList.add("cart__item__content__description")

  const cartProductName = document.createElement("h2")
  cartItemContentDescription.appendChild(cartProductName)
  cartProductName.textContent = product.productName

  const cartItemColor = document.createElement("p")
  cartItemContentDescription.appendChild(cartItemColor)
  cartItemColor.textContent = product.color

  const cartItemPrice = document.createElement("p")
  cartItemContentDescription.appendChild(cartItemPrice)
  cartItemPrice.textContent = `${product.price} €`

  const cartItemContentSettings = document.createElement("div")
  cartItemContent.appendChild(cartItemContentSettings)
  cartItemContentSettings.classList.add("cart__item__content__settings")

  const cartItemContentSettingsQuantity = document.createElement("div")
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)
  cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")

  const cartItemQuantityParagraph = document.createElement("p")
  cartItemContentSettingsQuantity.appendChild(cartItemQuantityParagraph)
  cartItemQuantityParagraph.textContent = "Qté :"

  const cartItemQuantity = document.createElement("input")
  cartItemContentSettingsQuantity.appendChild(cartItemQuantity)
  cartItemQuantity.classList.add("itemQuantity")
  cartItemQuantity.setAttribute("type", "number")
  cartItemQuantity.setAttribute("name", "itemQuantity")
  cartItemQuantity.setAttribute("min", "1")
  cartItemQuantity.setAttribute("max", "100")
  cartItemQuantity.setAttribute("value", product.quantity)

  const cartItemContentSettingsDelete = document.createElement("div")
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete)
  cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete")

  const deleteItem = document.createElement("p")
  cartItemContentSettingsDelete.appendChild(deleteItem)
  deleteItem.classList.add("deleteItem")
  deleteItem.textContent = "Supprimer"
}


/* function addAllProducts(cart) {
  cart.forEach((productObject) => {
    displayProduct(productObject)
  })
}

function displayProduct(productObject) {
  console.log(productObject)
} */