const sendMessage = document.querySelector("#sendMessage");
const inputNom = document.querySelector("#nom");
const inputMail = document.querySelector("#mail");
const inputPhone = document.querySelector("#phone");
const inputMessage = document.querySelector("#message");

function init() {}

inputNom.addEventListener("focusout", checkEmptyInput);
inputMessage.addEventListener("focusout", checkEmptyInput);
inputMail.addEventListener("focusout", (e) => {
  if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  } else {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
  }
});

sendMessage.addEventListener("click", async (e) => {
  document.querySelector(".spinner-border").classList.toggle("d-none");
  [(inputNom, inputMail, inputMessage)].forEach((element) => {
    element.dispatchEvent(new Event("focusout"));
  });
  if (document.querySelectorAll(".is-invalid").length == 0) {
    let bodyContent = JSON.stringify({
      nom: inputNom.value,
      mail: inputMail.value,
      tel: inputPhone.value.toString(),
      texte: inputMessage.value,
    });

    let res = await fetch("http://localhost:3000/sendMail", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: bodyContent,
    }).then((res) => {
      if (res.status == 200) {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
      }
    });
  }
  document.querySelector(".spinner-border").classList.toggle("d-none");
});

function checkEmptyInput(e) {
  if (e.target.value == "") {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
  } else {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  }
}
