document.querySelector("#search").addEventListener("click", () => {
  let search = document.querySelector(`input[type="search"]`);
  if (search.value != "") {
    location.href = "./search?query=" + search.value;
  }
});

cartSize();
/**
 *
 * @returns {JSON}
 */
async function getProduits() {
  return await fetch("http://localhost:3000/produits", {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }).then((res) => res.json());
}
function cartSize() {
  let cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
  document.querySelector(".icon-badge").innerText = cart.length;
  if (cart.length == 0) {
    document.querySelector(".icon-badge").classList.add("d-none");
  } else {
    document.querySelector(".icon-badge").classList.remove("d-none");
  }
}
async function getProduct(idObj) {
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
async function searchList(params) {
  let bodyContent = JSON.stringify({
    query: params,
  });

  return await fetch("http://localhost:3000/produits", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: bodyContent,
  }).then((res) => res.json());
}
async function searchType(params) {
  let bodyContent = JSON.stringify({
    query: params,
  });

  return await fetch("http://localhost:3000/produits/type", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: bodyContent,
  }).then((res) => res.json());
}
