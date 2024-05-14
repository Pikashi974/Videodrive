document.querySelector("#search").addEventListener("click", () => {
  let search = document.querySelector(`input[type="search"]`);
  if (search.value != "") {
    location.href = "./search?query=" + search.value;
  }
});

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
