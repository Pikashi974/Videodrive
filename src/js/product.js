const idObj = location.href.match(/([^\/]+)$/gm)[0];
let product;
let cart;
let productCart;

async function init() {
  cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
  if (idObj != "produit") {
    product = await getProduct(idObj);
    productCart = cart.filter((element) => element._id == product._id)[0];
    showProduct();
  }
}
init();

async function showProduct() {
  document.querySelector(
    "main"
  ).innerHTML = `<div class="d-grid" style="grid-template-columns: 20% 30% 40%;width: 100%;margin: 5%;">
            <div id="imgList"></div>
            <div id="imgShow">
                <img src="${product.image}">
            </div>
            <div id="productForm">
                <h3>${product.name}</h3>
                <h5>${product.price.toFixed(2)} €</h5>
                <p>${
                  product.description
                    ? product.description
                    : "Aucune description disponible"
                }</p>
                <hr>
                <div class="d-inline-flex gap-5 w-100">
                    <div class="input-group mb-3">
                        <button class="btn colored" type="button" id="minus">-</button>
                        <input type="number" readonly class="border" placeholder="Quantité" value="${
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
        </div>
        <div id="consolesShow">
            <div class="d-flex flex-row">
                <div style="
                           width: 10px;
                           height: 20px;
                           background-color: #FACD02;
                        "></div>
                <span style="color: #FACD02;">Suggestion</span>
            </div>
            <div class="d-flex">${await showSuggestions()}</div>
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
        support: product.support,
        type: product.type,
      });
    } else {
      let tabId = cart.findIndex((element) => element._id == product._id);
      console.log(tabId);
      cart[tabId].qte = qteSelect.value;
    }
    localStorage.cart = JSON.stringify(cart);
    cartSize();
  });
}
async function showSuggestions() {
  let data = [];
  let texte = "";
  switch (product.type) {
    case "jeu":
      await searchType("jeu").then(
        (res) =>
          (data = data.concat(res.filter((obj) => obj.type == product.type)))
      );
      await searchList(product.type).then((res) => (data = data.concat(res)));
      console.log(data);

      break;
    case "console":
      await searchType("jeu").then((res) => (data = data.concat(res)));
      console.log(data);
      break;
    default:
      break;
  }
  data
    .sort((a, b) => 0.5 - Math.random())
    .slice(0, 5)
    .forEach((obj) => {
      texte += `<div class="card mb-3" style="cursor: pointer;width: min-content">
                <a href="./${obj._id}">
                    <img src="${obj.image}" >
                    <div class="card-body">
                        <p style="width: fit-content;">${obj.name}</p>
                        <p style="width: fit-content;">${obj.price} €</p>
                    </div></a>
                </div>`;
    });
  return texte;
}
