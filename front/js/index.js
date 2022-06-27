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
    productAnchor.href = `./product.html?id=${product._id}`
    document.getElementById("items").appendChild(productAnchor)
  
    const productArticle = document.createElement("article")
    productAnchor.appendChild(productArticle)
  
    const productImage = document.createElement("img")
    productImage.src = product.imageUrl
    productImage.alt = product.altTxt
    productArticle.appendChild(productImage)
  
    const productName = document.createElement("h3")
    productName.classList.add("productName")
    productName.textContent = product.name
    productArticle.appendChild(productName)
  
    const productDescription = document.createElement("p")
    productDescription.classList.add("productDescription")
    productDescription.textContent = product.description    
    productArticle.appendChild(productDescription)
}