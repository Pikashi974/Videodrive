const listBest = document.querySelector("#listBest");

async function init() {
  let data = await getProduits();
  data.slice(0, 3).forEach((object) => {
    listBest.innerHTML += `<div class="card mb-3">
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
  setInterval(() => {
    document
      .querySelector(".carousel-control-next")
      .dispatchEvent(new Event("click"));
  }, 3000);
}
init();
