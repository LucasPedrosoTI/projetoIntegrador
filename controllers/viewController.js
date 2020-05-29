const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");
const axios = require("axios");
const opencage = require("opencage-api-client");
const postosResposta = require("../database/postosResposta.json");
const produtosResposta = require("../database/produtosResposta.json");
const moment = require("moment");
const { Posto, Usuario, Produto } = require("../models");
const sequelize = require("sequelize");

const now = moment();

// const interval = require("interval-promise");
// const util = require("util");

// const source = path.join("database", "postos.csv");
const destination = path.join("database", "postosResposta.json");
const destinationProdutos = path.join("database", "produtosResposta.json");

module.exports = {
  index: (req, res, next) => res.render("index"),

  main: async (req, res, next) => {
    let postos = [];

    if (req.session.usuario) {
      let { id } = req.session.usuario;
      const user = await Usuario.findOne({ where: id });
      // return res.send(user);
      postos = await Posto.findAll({
        include: [
          {
            association: "produtos",
            where: { id: user.produtos_id },
          },
          "avaliacoes",
          "usuarios",
        ],
      });
    } else {
      postos = await Posto.findAll({
        include: [
          {
            association: "produtos",
            where: { id: 1 },
          },
          "avaliacoes",
          "usuarios",
        ],
      });
    }

    // CÓDIGO PARA CALCULAR E ARMAZENAR A NOTA MÉDIA DOS POSTOS
    for (const posto of postos) {
      if (posto.avaliacoes.length == 0) {
        posto.media = 0;
      } else {
        // EXTRAIR TODAS AS NOTAS DE UM POSTO E ARMAZENAR EM UM ARRAY
        let notas = [];
        for (const avaliacao of posto.avaliacoes) {
          notas.push(Number(avaliacao.Avaliacoes.nota));
        }
        // COM O ARRAY DE NOTAS, BASTA SOMAR TODOS OS INDICES E DIVIDIR PELA QTD PARA OBTER A MEDIA
        let media = notas.reduce((a, b) => a + b) / notas.length;

        // COD P/ TER CTZ QUE A NOTA SERÁ SEMPRE DE 0.5 EM 0.5
        media = Math.round(media * 2) / 2;
        // CRIAR A PROPRIEDADE MEDIA
        posto.media = media;
      }
    }

    res.render("main", { postos });
  },

  indexPostos: async (req, res) => {
    let produto = {};
    let produtos_id;

    // TRANSFORMAR CSV EM JSON
    const postos = await csv({
      noheader: false,
      headers: ["nome", "cnpj", "produto", "data", "preco", "bandeira"],
      delimiter: ",",
    }).fromFile(source);

    let postoJaExiste = postosResposta.find(
      (posto) => posto.cnpj == postos[20721].cnpj
    );

    postos[20721].produto == "ETANOL" ? (produtos_id = 2) : (produtos_id = 1);

    if (postoJaExiste) {
      var produtoJaExiste = produtosResposta.find(
        (produto) =>
          produto.produtos_id == produtos_id &&
          produto.postos_id == postoJaExiste.id
      );
      console.log("Posto já existe, verificando se o produto existe");
      produto.postos_id = postoJaExiste.id;
    }

    produto.produtos_id = produtos_id;

    if (
      produtoJaExiste &&
      postoJaExiste &&
      moment(postos[20721].data, "DD/MM/YYYY").subtract(
        moment(postoJaExiste.update_time, "DD/MM/YYYY")
      ) > 0
    ) {
      console.log(
        "posto e produto já existem, mas o produto analisado é mais atual. Atualizando!"
      );
      produtoJaExiste.preco = Number(postos[20721].preco.replace(",", "."));
      postoJaExiste.update_time = moment(
        postos[20721].data,
        "DD/MM/YYYY"
      ).format("DD/MM/YYYY");

      fs.writeFileSync(destination, JSON.stringify(postosResposta));
      fs.writeFileSync(destinationProdutos, JSON.stringify(produtosResposta));

      console.log("Produto e posto atualizados com sucesso!");

      return res.send(produtosResposta);
    }

    produto.preco = Number(postos[20721].preco.replace(",", "."));

    if (!postoJaExiste) {
      // CONSULTAR A API DE CNPJ
      const { data } = await axios.get(
        `https://www.receitaws.com.br/v1/cnpj/${postos[20721].cnpj}`,
        {}
      );

      // ENCODAR QUERY PARA TIPO URL
      let uri = encodeURI(
        `${data.logradouro}, ${data.bairro}, ${data.municipio}, ${data.uf}`
      );

      // CONSULTAR API DE GEOCODING
      const { results } = await opencage.geocode({
        q: `${data.logradouro}, ${data.bairro}, ${data.municipio}, ${data.uf}`,
      });

      // CRIAR UM OBJETO COM AS INFORMAÇÕES NECESSÁRIAS

      let id =
        postosResposta.length == 0
          ? 1
          : postosResposta[postosResposta.length - 1].id + 1;

      let novoPosto = {
        id,
        nome: data.nome,
        cnpj: postos[20721].cnpj,
        cep: data.cep.replace(/[-.]/gm, ""),
        cidade: data.municipio,
        estado: data.uf,
        bairro: data.bairro,
        endereco: data.logradouro,
        bandeira: postos[20721].bandeira,
        latitude: results[0].geometry.lat,
        longitude: results[0].geometry.lng,
        create_time: now.format("DD/MM/YYYY"),
        update_time: moment(postos[20721].data, "DD/MM/YYYY").format(
          "DD/MM/YYYY"
        ),
      };

      postosResposta.push(novoPosto);

      produto.postos_id = novoPosto.id;

      fs.writeFileSync(destination, JSON.stringify(postosResposta));
    }

    if (!produtoJaExiste) {
      produtosResposta.push(produto);

      postoJaExiste.update_time = moment(
        postos[20721].data,
        "DD/MM/YYYY"
      ).format("DD/MM/YYYY");

      fs.writeFileSync(destination, JSON.stringify(postosResposta));

      fs.writeFileSync(destinationProdutos, JSON.stringify(produtosResposta));

      console.log("Produto criado com sucesso!");

      return res.send(produtosResposta);
    }

    // SALVAR O OBJETO NUM JSON
    console.log(
      "Ambos já existem e o produto a adicionar é mais antigo que o existente"
    );

    return res.send(postosResposta);

    // var urls = [];
    // for (const posto of postos) {
    //   urls.push(posto.cnpj);
    // }
    /*
    const buscaCnpj = async (cnpj) => {
      let { data } = await axios.get(
        `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
      );

      return data;
    };

    var requestAsync = util.promisify(buscaCnpj); // const util = require('util')
    const results = await Promise.all(urls.map(requestAsync));

    return res.send(results);
    */

    // try {
    // } catch (error) {
    //   console.log(error);
    // }

    // var geocoder = NodeGeocoder({
    //   provider: "opencage",
    //   apiKey: "a285b5a94c5a4d9c9a7045509f3a2187",
    // });
    //
  },
  login: (req, res, next) => {
    if (req.session.usuario) {
      res.redirect("/usuario/dashboard");
    }

    res.render("login", { error: null });
  },

  cadastro: (req, res, next) => {
    if (req.session.usuario) {
      res.redirect("/usuario/dashboard");
    }
    res.render("cadastro");
  },

  servicos: (req, res) => {
    res.render("servicos");
  },

  quemsomos: (req, res) => {
    res.render("quemsomos");
  },

  contato: (req, res) => {
    res.render("contato");
  },

  termosdeuso: (req, res) => {
    res.render("termosdeuso");
  },

  dashboardEmpresa: (req, res) => {
    res.render("dashboard-empresa");
  },
};
