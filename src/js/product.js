const idObj = location.href.match(/([^\/]+)$/gm)[0];
let product;
let cart;
let productCart;

async function init() {
  cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
  if (idObj != "produit") {
    product = await getProduct();
    productCart = cart.filter((element) => element._id == product._id)[0];
    showProduct();
  }
}
init();

function showProduct() {
  document.querySelector(
    "main"
  ).innerHTML = `<div class="d-grid" style="grid-template-columns: 20% 30% 40%;width:90%">
            <div id="imgList">
                <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200"
                    aria-label="Placeholder: Image cap" focusable="false" role="img"
                    preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180"
                    style="font-size:1.125rem;text-anchor:middle">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200"
                    aria-label="Placeholder: Image cap" focusable="false" role="img"
                    preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180"
                    style="font-size:1.125rem;text-anchor:middle">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200"
                    aria-label="Placeholder: Image cap" focusable="false" role="img"
                    preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180"
                    style="font-size:1.125rem;text-anchor:middle">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200"
                    aria-label="Placeholder: Image cap" focusable="false" role="img"
                    preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180"
                    style="font-size:1.125rem;text-anchor:middle">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
            </div>
            <div id="imgShow">
                <img src="${product.image}">
            </div>
            <div id="productForm">
                <h3>${product.name}</h3>
                <h5>${product.price.toFixed(2)} €</h5>
                <p>${product.description ? product.description : ""}</p>
                <hr>
                <div class="d-inline-flex gap-5 w-100">
                    <div class="input-group mb-3">
                        <button class="btn colored" type="button" id="minus">-</button>
                        <input type="number" readonly class="form-control" placeholder="Quantité" value="${
                          productCart ? productCart.qte : 1
                        }" min="1"
                            max="${product.qte}">
                        <button class="btn colored" type="button" id="plus">+</button>
                    </div>
                    <div class="input-group mb-3">
                        <button class="btn colored" type="button" id="addToCart">Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </div>`;

  const plus = document.querySelector("#plus");
  const minus = document.querySelector("#minus");
  const addToCart = document.querySelector("#addToCart");
  const qteSelect = document.querySelector("input[type='number']");

  plus.addEventListener("click", () => {
    if (Number(qteSelect.max) > Number(qteSelect.value)) {
      qteSelect.value++;
    }
  });
  minus.addEventListener("click", () => {
    if (Number(qteSelect.min) < Number(qteSelect.value)) {
      qteSelect.value--;
    }
  });
  addToCart.addEventListener("click", () => {
    if (cart.filter((element) => element._id == product._id).length == 0) {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        qte: qteSelect.value,
        type: product.type,
      });
    } else {
      let tabId = cart.findIndex((element) => element._id == product._id);
      console.log(tabId);
      cart[tabId].qte = qteSelect.value;
    }
    localStorage.cart = JSON.stringify(cart);
  });
}
async function getProduct() {
  let bodyContent = JSON.stringify({
    query: idObj,
  });

  return await fetch("http://localhost:3000/produits/id", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: bodyContent,
  }).then((res) => res.json());
}
