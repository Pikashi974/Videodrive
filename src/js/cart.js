const emptyCartButton = document.querySelector("#emptyCart");
let bodyCart = document.querySelector("tbody");

let cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];

function init() {
  if (cart.length == 0) {
    document.querySelector("#summaryCart").remove();
  }
  displayCartElements();
}
init();

emptyCartButton.addEventListener("click", () => {
  if (window.confirm("Etes-vous sure de vouloir vider le panier?") == true) {
    localStorage.removeItem("cart");
    location.reload();
  }
});

function displayCartElements() {
  bodyCart.innerHTML = "";
  if (cart.length == 0) {
    bodyCart.innerHTML = `<tr class="table">
        <th scope="row" colspan="4" style="text-align: center;">Panier vide</th>
    </tr>`;
  } else {
    cart.forEach((object, index) => {
      bodyCart.innerHTML += `<tr class="table" position="${index}">
        <th scope="row">${object.name}${
        object.type == "jeu" ? ` (${object.support})` : ""
      }</th>
        <td>${object.price} €</td>
        <td><input type="number"onchange="calcCartTotal();" id="qte${index}" class="form-control" min="1" value="${
        object.qte
      }"></td>
        <td><span id="total${index}">${object.qte * object.price}</span> €</td>
    </tr>`;
    });
    document
      .querySelectorAll('input[type="number"]')
      .forEach((element, index) => {
        element.addEventListener("change", (e) => {
          cart[index].qte = Number(e.target.value);
          document.querySelector(`#total${index}`).innerText =
            cart[index].qte * cart[index].price;
          localStorage.cart = JSON.stringify(cart);
          calcCartTotal();
        });
      });
    calcCartTotal();
  }
}
function calcCartTotal() {
  document.querySelector("#productTotal").innerText = cart
    .map((element) => element.qte)
    .reduce((a, b) => a + b, 0);

  document.querySelector("#sumTotal").innerText =
    cart
      .map((element) => element.qte * element.price)
      .reduce((a, b) => a + b, 0) + " €";
}
