const listObject = document.querySelector("#listObject");
const searchParams = new URLSearchParams(window.location.search);

let res;

async function init() {
  let textSearch = searchParams.get("query");
  console.log(textSearch);
  if (textSearch) {
    res = await searchList(textSearch);
  } else {
    res = await getProduits();
  }
  listObject.innerHTML = "";
  if (res.length != 0) {
    res.forEach((object) => {
      listObject.innerHTML += `<div class="card mb-3">
                    <img src="${
                      object.image
                        ? object.image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
                    }" height=150 />
                    <div class="card-body">
                        <p>${object.name}</p>
                        <p>${object.price} €</p>
                    </div>
                </div>`;
    });
  } else {
    listObject.innerHTML =
      "<span>Désolé, la recherche n'a pas abouti. Veuillez affiner votre recherche.</span>";
  }
}

init();

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
