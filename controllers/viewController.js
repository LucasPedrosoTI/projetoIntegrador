const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");
const axios = require("axios");
const opencage = require("opencage-api-client");
const postosResposta = require("../database/postosResposta.json");
// const interval = require("interval-promise");
// const util = require("util");

// const file = path.join("database", "postos.csv");
const destination = path.join("database", "postosResposta.json");

module.exports = {
  index: (req, res, next) => res.render("index"),

  main: (req, res, next) => {
    res.render("main", { error: null });
  },

  indexPostos: async (req, res) => {
    // TRANSFORMAR CSV EM JSON
    const postos = await csv({
      noheader: false,
      headers: ["nome", "cnpj", "produto", "data", "preco", "bandeira"],
      delimiter: ",",
    }).fromFile(file);

    // CONSULTAR A API DE CNPJ
    const { data } = await axios.get(
      `https://www.receitaws.com.br/v1/cnpj/${postos[9].cnpj}`,
      {}
    );

    // ENCODAR QUERY PARA TIPO URL
    let uri = encodeURI(
      `${data.logradouro}, ${data.bairro}, ${data.municipio}, ${data.uf}`
    );

    // CONSULTAR API DE GEOCODING
    const { results } = await opencage.geocode({
      q: uri,
    });

    // CRIAR UM OBJETO COM AS INFORMAÇÕES NECESSÁRIAS

    let novoPosto = {
      nome: data.nome,
      cnpj: postos[9].cnpj,
      cep: data.cep.replace(/[-.]/gm, ""),
      cidade: data.municipio,
      estado: data.uf,
      bairro: data.bairro,
      endereco: data.logradouro,
      bandeira: postos[9].bandeira,
      latitude: results[0].geometry.lat,
      longitude: results[0].geometry.lng,
      create_time: new Date(),
      update_time: new Date(postos[9].data),
      produto: postos[9].produto,
      preco: Number(postos[9].preco.replace(",", ".")),
    };

    postosResposta.push(novoPosto);

    // SALVAR O OBJETO NUM JSON
    fs.writeFileSync(destination, JSON.stringify(postosResposta));

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
