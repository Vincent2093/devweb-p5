fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(products => addAllProducts(products))
    .catch(error => alert(error = "Notre site rencontre actuellement un problème, merci de bien vouloir contacter notre assistance."))

function addAllProducts(products) {
    products.forEach((product) => {
    displayProduct(product)
  })
}

function displayProduct(product) {
    const productAnchor = document.createElement("a")
    document.getElementById("items").appendChild(productAnchor)
    productAnchor.href = `./product.html?id=${product._id}`
  
    const productArticle = document.createElement("article")
    productAnchor.appendChild(productArticle)
  
    const productImage = document.createElement("img")
    productArticle.appendChild(productImage)
    productImage.src = product.imageUrl
    productImage.alt = product.altTxt
  
    const productName = document.createElement("h3")
    productArticle.appendChild(productName)
    productName.classList.add("productName")
    productName.textContent = product.name
  
    const productDescription = document.createElement("p")
    productArticle.appendChild(productDescription)
    productDescription.classList.add("productDescription")
    productDescription.textContent = product.description    
}