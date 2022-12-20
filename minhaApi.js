const express = require("express");
const app = express();
const port = 8081;
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
let encodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.send("<p> Teste</p>");
});

app.get("/buscaItem", (req, res) => {
  let form = "<form action='/anuncios' method='GET'>";
  form += "<label>Tipo: </label><input type='text' name='tipo'><br>";
  form += "<label>Produto: </label><input type='text' name='produto'><br>";
  form += "<label>Descrição: </label><input type='text' name='descricao'><br>";
  form += "<label>Preço: </label><input type='text' name='preco'><br>";
  form += "<button>Buscar</button></form>";

  res.send("<div>Procure aqui!</div><br>" + form);
});

app.post("/anuncios", encodedParser, (req, res) => {
  let tipo = req.body.tipo;
  let produto = req.body.produto;
  let descricao = req.body.descricao;
  let preco = req.body.preco;
  let novoAnuncio = {
    produto: produto,
    tipo: tipo,
    descricao: descricao,
    preco: preco,
  };

  fs.readFile("meuBD.json", "utf-8", (erro, texto) => {
    if (erro) throw "erro" + erro;
    let meuBD = JSON.parse(texto);
    meuBD.anuncios.push(novoAnuncio);
    let meuBDJson = JSON.stringify(meuBD);
    console.log(meuBDJson);

    fs.writeFile("meuBD.json", meuBDJson, (erro) => {
      if (erro) {
        throw "erro:" + erro;
      } else {
        res.send(meuBDJson);
      }
    });
  });
});

app.get("/anuncios", (req, res) => {
  let tipo = req.query.tipo;
  let produto = req.query.produto;
  let preco = req.query.preco;

  console.log(req.query);

  fs.readFile("meuBD.json", "utf8", (erro, texto) => {
    if (erro) throw "Deu algum erro: " + erro;
    let meuBD = JSON.parse(texto);
    console.log(meuBD);
    let anuncios = meuBD.anuncios;
    let filtrado = anuncios.filter(
      (valor) =>
        parseFloat(valor.preco) < preco &&
        valor.tipo.toLowerCase().includes(tipo.toLowerCase()) &&
        valor.produto.toLowerCase().includes(produto.toLocaleLowerCase())
    );
    let resultado = "";

    for (let i = 0; i < filtrado.length; i++) {
      resultado += "<a href='/detalhe/" + filtrado[i].tipo + "'>";
      resultado += `<b>Produto: </b> ${filtrado[i].produto}`;
      resultado += `<b>Descrição: </b> ${filtrado[i].descricao}`;
      resultado += `<b>Preço: </b> ${filtrado[i].preco}`;
      resultado += "</a><br>";
    }

    res.json(meuBD);
  });
});

app.listen(port, () => {
  console.log(`Esta aplicação está escutando a
	porta ${port}`);
});
