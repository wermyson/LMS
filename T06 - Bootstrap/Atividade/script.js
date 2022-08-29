let grupos = [];
let grupo_select;
let name_user;

class Grupo {
  constructor(nome, id) {
    this.nome = nome;
    this.id = id;
    this.mensagens = [];
  }
}

class Mensagem {
  constructor(id, nome, corpo, grupo_id) {
    this.id = id;
    this.nome = nome;
    this.corpo = corpo;
    this.grupo_id = grupo_id;
  }
}

function criarGrupo(nome, id) {
  grupos.push(new Grupo(nome, id));
}

function criarMensagens(id, nome, corpo, grupo_id) {
  return new Mensagem(id, nome, corpo, grupo_id);
}

function atualizarSistema() {
  axios({
    method: "GET",
    url: "https://server-json-lms.herokuapp.com/grupos",
  })
    .then((response) => {
      for (let grupo of response.data) {
        criarGrupo(grupo.nome, grupo.id);
      }
      for (let i = 0; i < grupos.length; i++) {
        mensagensGrupo(grupos[i], grupos[i].id);
      }

      exibirGrupos();
    })
    .catch((error) => {
      console.log(error);
    });
}
function mensagensGrupo(Grupo, id) {
  axios({
    method: "GET",
    url: "https://server-json-lms.herokuapp.com/grupos/" + id + "/mensagens",
  })
    .then((response) => {
      for (let Mensagem of response.data) {
        let aux = criarMensagens(
          Mensagem.id,
          Mensagem.nome,
          Mensagem.corpo,
          Mensagem.grupoId
        );
        Grupo.mensagens.push(aux);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function criarViewGrupo(nome, listMensagem, grupoId) {
  let viewGrupos = document.querySelector(
    ".content .section-grupos .view-grupos"
  );

  let grupo = document.createElement("div");
  grupo.classList.add("grupo");

  let img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
  );
  let h1 = document.createElement("h1");
  h1.classList.add("name-grupo");
  let abbr = document.createElement("abbr");
  abbr.setAttribute("title", nome);

  abbr.textContent = nome;
  grupo.appendChild(img);
  grupo.appendChild(h1);
  h1.appendChild(abbr);

  viewGrupos.appendChild(grupo);
  grupo.addEventListener("click", function () {
    grupo_select = grupoId;
    console.log(grupo_select);
    limparViewMensagem();
    if (listMensagem.length == 0) {
      alert("Não foram encontradas mensagens");
    }
    for (let i = 0; i < listMensagem.length; i++) {
      criarViewMensagem(listMensagem[i].nome, listMensagem[i].corpo);
    }
  });
}

function criarViewMensagem(nome, corpo) {
  let viewMensagens = document.querySelector(".area-mensagens .view-mensagens");

  let mensagem = document.createElement("div");
  mensagem.classList.add("mensagem");
  mensagem.classList.add("active");

  let h1 = document.createElement("h1");
  h1.classList.add("user-name");
  h1.textContent = nome;

  let p = document.createElement("p");
  p.classList.add("mensagem-txt");
  p.textContent = corpo;

  mensagem.appendChild(h1);
  mensagem.appendChild(p);

  viewMensagens.appendChild(mensagem);
}

let button_modal = document.querySelector(
  ".modal .modal-bloco .content button"
);

let modal = document.querySelector(".modal");

let modal_name = document.querySelector(".modal .modal-bloco .content input");

let name_user_view = document.querySelector(".zap-web .nav .user-name-nav");

button_modal.addEventListener("click", function () {
  if (3 < modal_name.value.length) {
    name_user = modal_name.value;
    modal.classList.toggle("active");
    let txt = document.createTextNode(name_user);
    name_user_view.appendChild(txt);
    name_user_view.classList.toggle("active");
  } else {
    alert("Use um nome de usuário válido \nCom pelo menos 4 letras ou mais");
  }
});

function limparGrupos() {
  let viewGrupos = document.querySelector(
    ".content .section-grupos .view-grupos"
  );
  viewGrupos.innerHTML = "";
}

function limparElementos() {
  limparGrupos();
  limparViewMensagem();
  atualizarSistema();
}

function exibirGrupos() {
  for (let i = 0; i < grupos.length; i++) {
    criarViewGrupo(grupos[i].nome, grupos[i].mensagens, grupos[i].id);
  }
}

function limparViewMensagem() {
  let viewMensagens = document.querySelector(
    ".content .area-mensagens .view-mensagens"
  );
  viewMensagens.innerHTML = "";
}

let conteudoMensagem = document.querySelector(
  ".area-mensagens .send-mensagens input"
);

let enviarMensagem = document.querySelector(
  ".area-mensagens .send-mensagens button"
);
enviarMensagem.addEventListener("click", function () {
  if (grupo_select == undefined) {
    alert("Por favor, selecione um grupo!");
  } else if (1 <= conteudoMensagem.value.length && grupo_select != undefined) {
    sendMensagem = conteudoMensagem.value;
    axios({
      method: "POST",
      url:
        "https://server-json-lms.herokuapp.com/grupos/" +
        grupo_select +
        "/mensagens",
      data: {
        nome: name_user,
        corpo: sendMensagem,
        grupoId: grupo_select,
      },
    });
  } else {
    alert("Por favor, não envie mensagens vazias \nEscreva algo legal!");
  }
  // limparElementos();
});

function montarMensagens() {
  for (let mensagem of grupo[grupo_select].mensagens) {
    criarViewMensagem(mensagem.nome, mensagem.corpo);
  }
}

let nomeGrupo = document.querySelector(".section-grupos .create-grupo input");

let novoGrupo = document.querySelector(".section-grupos .create-grupo button");

novoGrupo.addEventListener("click", function () {
  if (nomeGrupo == "") {
    alert("Por favor, escreva algo.");
  } else if (1 <= nomeGrupo.value.length && grupo_select != "") {
    sendMensagem = nomeGrupo.value;
    axios({
      method: "POST",
      url: "https://server-json-lms.herokuapp.com/grupos",
      data: {
        nome: nomeGrupo.value,
      },
    });
  } else {
    alert("Por favor, não envie mensagens vazias \nEscreva algo legal!");
  }
  // limparElementos();
});
atualizarSistema();
