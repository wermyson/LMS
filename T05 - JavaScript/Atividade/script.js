let button_menu_hamburguer = document.querySelector(
  ".navegador-superior .button-menu-hamburguer"
);
let menu_lateral_esquerdo = document.querySelector(
  ".conteudo .menu-lateral-esquerdo"
);
let espaco_conteudo = document.querySelector(".conteudo .espaco-conteudo");
let button_postar = document.querySelector(
  ".navegador-superior .button-postar"
);
let modal = document.querySelector(".modal");
let modal_close = document.querySelector(
  ".modal .modal-overlay .modal-container .modal-close"
);
button_menu_hamburguer.addEventListener("click", function () {
  menu_lateral_esquerdo.classList.toggle("active");
  espaco_conteudo.classList.toggle("active");
});

button_postar.addEventListener("click", function () {
  modal.classList.toggle("active");
});

modal_close.addEventListener("click", function () {
  modal.classList.toggle("active");
});

let modal_name = document.querySelector(
  ".modal .modal-overlay .modal-content .modal-name"
);

let modal_mensagem = document.querySelector(
  ".modal .modal-overlay .modal-content .modal-mensagem"
);

let button_submite = document.querySelector(
  ".modal .modal-footer .button-submite"
);

button_submite.addEventListener("click", function () {
  let name = modal_name.value;
  let mensagem = modal_mensagem.value;
  let post = document.createElement("div");
  post.classList.add("post");
  espaco_conteudo.appendChild(post);

  let h3_name = document.createElement("h3");
  h3_name.classList.add("name");
  let h3_name_text = document.createTextNode(name);
  h3_name.appendChild(h3_name_text);
  post.appendChild(h3_name);

  let p_mensagem = document.createElement("p");
  p_mensagem.classList.add("mensagem");
  let p_mensagem_text = document.createTextNode(mensagem);
  p_mensagem.appendChild(p_mensagem_text);
  post.appendChild(p_mensagem);

  modal.classList.toggle("active");
  post_data.push(post);
});

let modal_overlay = document.querySelector(".modal .modal-overlay");
window.addEventListener("click", function (event) {
  if (event.target == modal_overlay) {
    modal.classList.toggle("active");
  }
});
