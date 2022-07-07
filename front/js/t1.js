const cartOrderForm = document.querySelector(".cart__order__form");

//écouter la modification du prénom
cartOrderForm.firstName.addEventListener("change", function () {
  validFirstName(this);
});

//écouter la modification du nom
cartOrderForm.lastName.addEventListener("change", function () {
  validLastName(this);
});

//écouter la modification de l'adresse
cartOrderForm.address.addEventListener("change", function () {
  validAddress(this);
});

//écouter la modification de la ville
cartOrderForm.city.addEventListener("change", function () {
  validCity(this);
});

//écouter la modification de l'email
cartOrderForm.email.addEventListener("change", function () {
  validEmail(this);
});

//validation du prénom
function validFirstName(inputFirstName) {
  //création de la reg exp pour valider prénom
  const firstNameRegExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$", "g");

  const testFirstName = firstNameRegExp.test(inputFirstName.value);
  const firstNameErrorMsg = inputFirstName.nextElementSibling;

  if (testFirstName) {
    firstNameErrorMsg.textContent = " ";
    return true;
  } else {
    firstNameErrorMsg.textContent = "Minimum 2 caractères, lettres uniquement.";
    return false;
  }
}

//validation du nom
function validLastName(inputLastName) {
  //création de la reg exp pour valider nom
  const lastNameRegExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$", "g");

  const testLastName = lastNameRegExp.test(inputLastName.value);
  const lastNameErrorMsg = inputLastName.nextElementSibling;

  if (testLastName) {
    lastNameErrorMsg.textContent = " ";
    return true;
  } else {
    lastNameErrorMsg.textContent = "Minimum 2 caractères, lettres uniquement.";
    return false;
  }
}

//validation de l'adresse postale
function validAddress(inputAddress) {
  //création de la reg exp pour valider l'adresse
  const addressRegExp = new RegExp("^[a-zA-ZÀ-ÿ0-9 ,.'-]{2,}$", "g");

  const testAddress = addressRegExp.test(inputAddress.value);
  const addressErrorMsg = inputAddress.nextElementSibling;

  if (testAddress) {
    addressErrorMsg.textContent = " ";
    return true;
  } else {
    addressErrorMsg.textContent =
      "Minimum 2 caractères, chiffres ou lettres uniquement.";
    return false;
  }
}

//validation de la ville
function validCity(inputCity) {
  //création de la reg exp pour valider la ville
  const cityRegExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$", "g");

  const testCity = cityRegExp.test(inputCity.value);
  const cityErrorMsg = inputCity.nextElementSibling;

  if (testCity) {
    cityErrorMsg.textContent = " ";
    return true;
  } else {
    cityErrorMsg.textContent = "Minimum 2 caractères, lettres uniquement.";
    return false;
  }
}

//validation de l'email
function validEmail(inputEmail) {
  //création de la reg exp pour valider email
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  const testEmail = emailRegExp.test(inputEmail.value);
  const emailErrorMsg = inputEmail.nextElementSibling;

  if (testEmail) {
    emailErrorMsg.textContent = " ";
    return true;
  } else {
    emailErrorMsg.textContent = "Merci de respecter le format email. ";
    return false;
  }
}

//récupérer ces données lors du click sur la bouton "commander"
function getOrderData() {
  //écouter la modification de la bouton "commander"
  cartOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputFirstName = document.getElementById("firstName");
    const inputLastName = document.getElementById("lastName");
    const inputAddress = document.getElementById("address");
    const inputEmail = document.getElementById("email");
    const inputCity = document.getElementById("city");

    //récupérer les données quand tous les champs sont bien validés
    if (
      validFirstName(inputFirstName) &&
      validLastName(inputLastName) &&
      validAddress(inputAddress) &&
      validCity(inputCity) &&
      validEmail(inputEmail)
    ) {
      //si le panier est vide
      if (cart.length == 0) {
        alert("Attention, votre panier est vide ! ");
      } else {
        sendOrderData();
        alert("Votre commande a bien été prise en compte.");
      }
    } else {
      alert("Merci de bien vérifier votre formulaire avant de commander");
    }
  });
}
getOrderData();

//préparer les données validées du formulaires avant d'envoyer au back-end
function prepareOrderData() {
  //format demandé par le back-end
  const contactData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
  };

  //préparer le tableau de string product ID
  const idProducts = [];

  for (let i = 0; i < cart.length; i++) {
    idProducts.push(cart[i].id);
  }

  const orderData = {
    products: idProducts,
    contact: contactData,
  };
  console.log(orderData)
  return orderData;
}

//envoyer les données du formulaire et les traiter
function sendOrderData() {
  const orderData = prepareOrderData();
  const jsonOrderData = JSON.stringify(orderData);

  //effectuer une requête POST sur l'API
   const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonOrderData,
  };

  //envoyer toutes les données concernées (prorduct-ID + données contacts) au back-end
  fetch("http://localhost:3000/api/products/order", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //vider le localStorage
      localStorage.clear();
      //diriger sur la page confirmation en passant l'id dans l'URL
      window.location.replace(`confirmation.html?order=${data.orderId}`);
    })
    .catch(function (error) {
      alert(
        "Le serveur ne répond pas. Si le problème persiste, contactez-nous par email : support@name.com."
      );
    });
}