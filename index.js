let preencheGame = document.querySelector("#editGame");

let preencheProducer = document.querySelector("#editProducer");

let preencheLaunch = document.querySelector("#editLaunch");

let preencheConsole = document.querySelector("#editConsole");

let gameIdInButtonEdit = document.querySelector("#btnSalvar");

let gameInput = document.getElementById("txtGame");
let producerInput = document.getElementById("txtProducer");
let launchInput = document.getElementById("txtLaunch");
let consoleInput = document.getElementById("txtConsole");

let dados = [];

window.onload = () => {
  populaTabela();
};

function trataDados() {
  if (
    gameInput.value == "" //||
    // producerInput.value == "" ||
    // launchInput.value == "" ||
    // consoleInput.value == ""
  ) {
    alert("Por favor, preencher ao menos o nome do game! ");
  } else {
    salvar();
  }
}

function populaTabela() {
  dados = JSON.parse(localStorage.getItem("__dados__")) || [];
  dados.map((dado, index) => {
    const tableBodyElement = document.querySelector(".tableBody");
    const trElement = document.createElement("tr");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    Object.keys(dado).forEach((key) => {
      const tdElement = document.createElement("td");

      tdElement.innerText = dado[key];
      trElement.appendChild(tdElement);
      tableBodyElement.appendChild(trElement);

      //BOTÃO DE EDITAR
      btnEdit.setAttribute("type", "button");
      btnEdit.setAttribute("class", "btn btn-primary");
      btnEdit.setAttribute("data-bs-target", "#modalEdit");
      btnEdit.setAttribute("data-bs-toggle", "modal");
      btnEdit.setAttribute("onclick", "editar(" + dado.ID + ")");
      btnEdit.innerText = "editar";
      tdElement.appendChild(btnEdit);

      //BOTÃO DE EXCLUIR
      btnDelete.setAttribute("type", "button");
      btnDelete.setAttribute("class", "btn btn-danger");
      btnDelete.setAttribute("onclick", "excluir(" + index + ")");
      btnDelete.innerText = "excluir";
      tdElement.appendChild(btnDelete);
    });
  });
}

function salvar() {
  //EVENTO CLICK DO BOTÃO SALVAR
  let Game = document.querySelector("#txtGame");
  let Producer = document.querySelector("#txtProducer");
  let Launch = document.querySelector("#txtLaunch");
  let Console = document.querySelector("#txtConsole");
  let ultimoIdInserido = 1;
  if (dados.length > 0) {
    ultimoIdInserido = dados[dados.length - 1].ID + 1;
  }
  var registro = {};

  registro.ID = ultimoIdInserido;

  registro.Game = Game.value;
  registro.Producer = Producer.value;
  registro.Launch = Launch.value;
  registro.Console = Console.value;
  registro.Excluir = document.createElement("input").value;

  localStorage.getItem("__dados__");
  dados.push(registro);
  localStorage.setItem("__dados__", JSON.stringify(dados));

  //LIMPA OS NOMES DOS INPUTS
  limpaCampos();
  location.reload();
}

function limpaCampos() {
  limpaGame = document.querySelector("#txtGame");
  limpaGame.value = "";

  limpaProducer = document.querySelector("#txtProducer");
  limpaProducer.value = "";

  limpaLaunch = document.querySelector("#txtLaunch");
  limpaLaunch.value = "";

  limpaConsole = document.querySelector("#txtConsole");
  limpaConsole.value = "";
}

function editar(id) {
  gameIdInButtonEdit.setAttribute("game-id", id);

  dados = JSON.parse(localStorage.getItem("__dados__")) || [];
  //pega o index do item para editar
  const game = dados.find((Game) => Game.ID === id);

  preencheDados(game);
}

function excluir(key) {
  dados = JSON.parse(localStorage.getItem("__dados__")) || [];
  //pega o index(posição) para excluir de um array
  dados.splice(key, 1);
  localStorage.setItem("__dados__", JSON.stringify(dados));
  location.reload();
}

function preencheDados(data) {
  preencheGame.value = data.Game;

  preencheProducer.value = data.Producer;

  preencheLaunch.value = data.Launch;

  preencheConsole.value = data.Console;
}

function editaObjeto() {
  let id = gameIdInButtonEdit.hasAttribute("game-id")
    ? gameIdInButtonEdit.getAttribute("game-id")
    : 0;

  id = parseInt(id);

  if (!id) {
    alert("Não foi possível encontrar o Game");
  }

  console.log("game id is: ", id);
  /**
   * ATENÇÃO TONHO: o método findIndex() retorna a index do Array.
   * caso você queira o objeto, usar find()
   */
  let procuraGameIndex = dados.findIndex((item) => item.ID === id);

  console.log("retorna a INDEX do game que estou editando: ", procuraGameIndex);
  console.log(
    "pegando no array o objeto que vou editar",
    dados[procuraGameIndex]
  );

  dados[procuraGameIndex].Game = preencheGame.value;
  dados[procuraGameIndex].Producer = preencheProducer.value;
  dados[procuraGameIndex].Launch = preencheLaunch.value;
  dados[procuraGameIndex].Console = preencheConsole.value;

  console.log("Dados já editado: ", dados);

  localStorage.setItem("__dados__", JSON.stringify(dados));
  location.reload();

  /*
    dadosGame.Game = preencheGame.value;
    dadosGame.Producer = preencheProducer.value;
    dadosGame.Launch = preencheLaunch.value;
    dadosGame.Console = preencheConsole.value;
  */
}
/*
function editar(id) {
  dados.forEach(function (item) {
    if (item == id) {
      editGame = document.querySelector("txtGame");
      editGame.value = `${registro.Game.value}`;
    }
  });
}*/
// key: 827bd4fbd7ff4c289957c6f15f436093

/*
buscaPokemon();

EXECUTANDO UMA REQUISIÇÃO GET
function buscaPokemon() {
  const pokemonUrl = "https://pokeapi.co/api/v2";
  axios
    .get(`${pokemonUrl}/pokemon/ditto`)
    .then(function (response) {
      //manipula o sucesso da requisição
      console.log(response);
    })
    .catch(function (error) {
      //manipula erros da requisição
      console.error(error);
    });
}
buscaPokemon();
*/
