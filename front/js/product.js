const url = new URL(document.location)
const id = url.searchParams.get("id")

const productImage = document.createElement("img")
const productName = document.getElementById("title")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const productColors = document.getElementById("colors")
const btnCart = document.getElementById("addToCart")

fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(product => displayProductDetails(product))
    .catch(error => alert(error = "Ce produit n'a pu être affiché, merci de bien vouloir contacter notre assistance."))

function displayProductDetails(product) {
    
    productImage.src = product.imageUrl
    productImage.alt = product.altTxt
    document.querySelector(".item__img").appendChild(productImage)

    productName.textContent = product.name

    productPrice.textContent = product.price
    
    productDescription.textContent = product.description

    product.colors.forEach((color) => {
        const productColorsOption = document.createElement("option")
        productColorsOption.value = color
        productColorsOption.textContent = color
        productColors.appendChild(productColorsOption)
    })
}

btnCart.addEventListener("click", sendToCart)

function sendToCart(){
        const color = document.getElementById("colors").value
        const quantity = document.getElementById("quantity").value

        if (color === "" && quantity == 0) {
            alert("Merci de choisir une couleur et une quantité supérieur à 0 !")
            return
        } else if (color === ""){
            alert("Merci de choisir une couleur !")
            return
        } else if (quantity == 0 || quantity > 100){
            alert("Merci de choisir une quantité comprise entre 1 et 100 !")
            return
        }
        
        const orderData = {
            id: id,
            imgAlt : productImage.alt,
            imgSrc : productImage.src,
            productName: productName.innerHTML,
            color: color,
            price: productPrice.innerHTML,
            quantity: quantity
        }

        localStorage.setItem(id, JSON.stringify(orderData))

        window.location.href = "cart.html";
}