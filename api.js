let data = [];
let entrada = document.getElementById("inputText");
let resultado = document.querySelector(".resultado");
resultado.setAttribute("class", "divResultado");

function mostraJogo() {
  console.log("array de jogos", data);
  data.forEach((game) => {
    console.log("dado da tabela", game.name);

    let paragrafo = document.createElement("p");
    let linha = document.createElement("div");
    let paragrafoPlpataforma = document.createElement("p");
    let quebraLinha = document.createElement("br");
    let foto = document.createElement("img");

    paragrafoPlpataforma.setAttribute("class", "jogoDapesquisa");
    paragrafo.setAttribute("class", "jogoDapesquisa");
    linha.setAttribute("class", "divLinha");
    foto.setAttribute("src", game.background_image);
    foto.setAttribute("class", "fotoResultado");

    paragrafoPlpataforma.innerHTML = "Lançado em: " + game.released;
    paragrafo.innerHTML = "Jogo: " + game.name;
    resultado.appendChild(paragrafo);
    resultado.appendChild(paragrafoPlpataforma);
    resultado.appendChild(foto);
    resultado.appendChild(linha);
    resultado.appendChild(quebraLinha);
    console.log("div com tudo dentro: ", resultado);
  });
}
async function buscaJogo() {
  resultado.innerHTML = "";
  const RAWGurl = `https://api.rawg.io/api/games?page_size=5&search=${entrada.value}&key=827bd4fbd7ff4c289957c6f15f436093`;
  await axios
    .get(`${RAWGurl}`)
    .then(function (response) {
      //manipula o sucesso da requisição
      data = response.data.results;
      mostraJogo();
      console.log("resposta da api ", resultado);
    })
    .catch(function (error) {
      //manipula erros da requisição
      console.error(error);
    });
  console.log(data);
}
