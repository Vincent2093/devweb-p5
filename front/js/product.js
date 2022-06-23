const url = new URL(document.location)
const id = url.searchParams.get("id")

fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(product => displayProductDetails(product))
    .catch(error => alert(error = "Ce produit n'a pu être affiché, merci de bien vouloir contacter notre assistance."))

function displayProductDetails(product) {
    const productImage = document.createElement("img")
    document.querySelector(".item__img").appendChild(productImage)
    productImage.src = product.imageUrl
    productImage.alt = product.altTxt

    const productName = document.getElementById("title")
    productName.textContent = product.name

    const productPrice = document.getElementById("price")
    productPrice.textContent = product.price

    const productDescription = document.getElementById("description")
    productDescription.textContent = product.description

    const productColors = document.getElementById("colors")

    product.colors.forEach((color) => {
    const productColorsOption = document.createElement("option")
    productColors.appendChild(productColorsOption)
    productColorsOption.value = color
    productColorsOption.textContent = color
    })
}