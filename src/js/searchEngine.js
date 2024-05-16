const listObject = document.querySelector("#listObject");
const pagination = document.querySelector("#pagination");
const searchParams = new URLSearchParams(window.location.search);

let res;
let maxElement = 5;

async function init() {
  let textSearch = searchParams.get("query");
  let typeSearch = searchParams.get("type");
  console.log(textSearch);
  if (textSearch) {
    res = await searchList(textSearch);
  } else if (typeSearch) {
    res = await searchType(typeSearch);
    document
      .querySelector(`a[href='./search${location.search}']`)
      .classList.add("active");
  } else {
    res = await getProduits();
  }
  generateListDisplay();
}

init();

async function filterByType(texte) {
  res = await searchType(texte);
  generateListDisplay();
}
function createList(dataOutput) {
  listObject.innerHTML = "";
  dataOutput.forEach((object) => {
    listObject.innerHTML += `<div class="card mb-3" style="cursor: pointer;width: min-content">
                  <a href='./product/${object._id}'>
                    <img src="${
                      object.image
                        ? object.image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
                    }" />
                    <div class="card-body">
                        <p style="width: fit-content;">${object.name}</p>
                        ${
                          object.type == "jeu"
                            ? `<p style="width: fit-content;">${object.support}</p>`
                            : ""
                        }
                        <p style="width: fit-content;">${object.price} €</p>
                    </div>
                    </a>
                </div>`;
  });
}
function makePagination(max) {
  let paginationHTML = `<ul class="pagination">
   <li class="page-item disabled" id="previousPage">
      <a class="page-link" href="#">&laquo;</a>
    </li>
    <li class="page-item ">
      <a class="page-link number active" href="#" value="1">1</a>
    </li>
    `;
  for (let index = max; index < res.length; index += max) {
    let pos = 1 + Math.floor(index / max);
    paginationHTML += `
     <li class="page-item">
      <a class="page-link number" href="#" value="${pos}">${pos}</a>
    </li>
    `;
  }
  paginationHTML += `
    <li class="page-item ${res.length <= 5 ? "disabled" : ""}"  id="nextPage">
      <a class="page-link" href="#">&raquo;</a>
    </li>
  </ul>
    `;
  pagination.innerHTML = paginationHTML;
  let previous = document.querySelector("#previousPage");
  let next = document.querySelector("#nextPage");
  document.querySelectorAll(".page-link.number").forEach((element) => {
    element.addEventListener("click", (e) => {
      // Désactive si on est à la première page
      e.target.attributes.value.value == 1
        ? previous.classList.add("disabled")
        : previous.classList.remove("disabled");
      // Désactive si à la dernière page
      Math.floor(res.length / max) < Number(e.target.attributes.value.value)
        ? next.classList.add("disabled")
        : next.classList.remove("disabled");

      if (!e.target.classList.contains("active")) {
        let currentPage = e.target.attributes.value.value - 1; // On commence à 0 pour une liste
        document
          .querySelector(".page-link.number.active")
          .classList.remove("active");
        e.target.classList.add("active");
        // console.log(res.slice(max * currentPage, max + max * currentPage));
        createList(res.slice(max * currentPage, max + max * currentPage));
      }
      // e.target.attributes;
      console.log(e.target.attributes.value.value);
      //e.target.parentElement
    });
  });
  previous.addEventListener("click", (e) => {
    if (!e.target.classList.contains("disabled")) {
      let active = Number(
        document.querySelector(".page-link.number.active").attributes.value
          .value
      );
      // console.log(
      //   document.querySelector(`.page-link.number[value='${active - 1}']`)
      // );
      document
        .querySelector(`.page-link.number[value='${active - 1}']`)
        .dispatchEvent(new Event("click"));
    }
  });
  next.addEventListener("click", (e) => {
    if (!e.target.classList.contains("disabled")) {
      let active = Number(
        document.querySelector(".page-link.number.active").attributes.value
          .value
      );
      // console.log(
      //   document.querySelector(`.page-link.number[value='${active + 1}']`)
      // );
      document
        .querySelector(`.page-link.number[value='${active + 1}']`)
        .dispatchEvent(new Event("click"));
    }
  });
}
function generateListDisplay() {
  if (res.length != 0) {
    let dataOutput = res.length > maxElement ? res.slice(0, maxElement) : res;
    createList(dataOutput);
    makePagination(maxElement);
  } else {
    listObject.innerHTML =
      "<span>Désolé, aucun élément trouvé. Veuillez affiner votre recherche ou contacter l'équipe.</span>";
    pagination.innerHTML = "";
  }
}
