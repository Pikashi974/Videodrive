const listBest = document.querySelector("#listBest");

async function init() {
  let data = await getProduits();
  data.slice(0, 3).forEach((object) => {
    listBest.innerHTML += `<div class="card mb-3" style="cursor: pointer;">
    <a href='./product/${object._id}'>
                    <img src="${
                      object.image
                        ? object.image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
                    }" height=150 />
                    <div class="card-body">
                        <p>${object.name}</p>
                        <p>${object.price} €</p>
                    </div></a>
                </div>`;
  });
  await createCrousel();
  setInterval(() => {
    document
      .querySelector(".carousel-control-next")
      .dispatchEvent(new Event("click"));
  }, 3000);
}
init();

async function createCrousel() {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let response = await fetch("http://localhost:3000/news", {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  // console.log(data);
  let texte = "";
  data.forEach((obj, index) => {
    texte += `
    <div class="carousel-item ${index == 0 ? "active" : ""}">
                    <a href="./product/${obj.source}">
                        <img src="${obj.image}" class="d-block" alt="...">
                    </a>
                </div>
    `;
  });
  document.querySelector(".carousel-inner").innerHTML = texte;
}
