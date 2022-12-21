const express = require("express");
const app = express();
const port = 8081;
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./meuBD.json");

app.use(cors());
let encodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.send("<p> Teste</p>");
});

app.get("/buscaItem", (req, res) => {
  var form = "<form action='/anuncios' method='GET'>";
  form += "<label>categoria: </label><input type='text' name='categoria'><br>";
  form += "<label>:produto </label><input type='text' name='busca'>";
  form += "<label>:preco </label><input type='text' name='preco'>";
  form += "<button>Buscar</button></form>";

  res.send("<div>Procure o seu produto.</div><br>" + form);
});

app.post("/anuncios", encodedParser, (req, res) => {
  let categoria = req.body.categoria;
  let produto = req.body.produto;
  let descricao = req.body.descricao;
  let preco = req.body.preco;
  let novoAnuncio = {
    produto: produto,
    categoria: categoria,
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
  /* let categoria = req.query.categoria || "";
    let produto = req.query.produto || "";
    let preco = req.query.preco || "";

    fs.readFile("meuBD.json", "utf8", (erro, texto) => {
      if (erro) throw "Deu algum erro: " + erro;
      let meuBD = JSON.parse(texto);
      let anuncios = meuBD.anuncios;
      let filtraDados = anuncios.filter((valor) => {
        //parseFloat(valor.preco) <= parseFloat(preco) &&
        //valor.categoria.toLowerCase().includes(categoria.toLowerCase()) &&
        //valor.produto.toLowerCase().includes(produto.toLocaleLowerCase());
        let precoFilter = parseFloat(valor.preco) <= parseFloat(preco);
        let categoriaFilter = valor.categoria
          .toLowerCase()
          .includes(categoria.toLowerCase());
        let produtoFilter = valor.produto
          .toLowerCase()
          .includes(produto.toLocaleLowerCase());
        console.log(
          `valores filtros: ${precoFilter}, ${categoriaFilter}, ${produtoFilter}`
        );
        return precoFilter || produtoFilter || categoriaFilter;
      });
      let resultado = "";
      for (let i = 0; i < filtraDados.length; i++) {
        resultado += "<p" + filtraDados[i].categoria + "'>";
        resultado += `<b>Produto: </b> ${filtraDados[i].produto}`;
        resultado += `<b>Descrição: </b> ${filtraDados[i].descricao}`;
        resultado += `<b>Preço: </b> ${filtraDados[i].preco}`;
        resultado += "</p><br>";
        console.log(`Os dados filtrados são: ${resultado}`);
      }

      res.json(filtraDados); 
    */
  let input = req.query.busca || "";
  let preco = req.query.preco || 0.0;
  parseFloat(preco);

  console.log(preco);

  console.log(`dados nao filtrados ${data.anuncios}`);
  let anunciosFitlrados = data.anuncios.filter((item) => {
    let search = input.toLowerCase();

    let nome = item.produto.toLowerCase().includes(search);
    let categoria = item.categoria.toLowerCase().includes(search);
    let repreco = parseFloat(item.preco) <= preco;

    // Pesquisa: d
    // Produto: abc
    // Descrição: da

    return nome || categoria || repreco;
  });

  console.log(`dados filtrados ${anunciosFitlrados}`);

  res.json(anunciosFitlrados);
});

app.listen(port, () => {
  console.log(`Esta aplicação está escutando a
	porta ${port}`);
});
