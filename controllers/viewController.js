const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");
const NodeGeocoder = require("node-geocoder");

const file = path.join("database", "infopreco.csv");

module.exports = {
  index: (req, res, next) => res.render("index"),

  main: (req, res, next) => {
    res.render("main");
  },

  indexPostos: (req, res) => {
    var geocoder = NodeGeocoder({
      provider: "opencage",
      apiKey: "a285b5a94c5a4d9c9a7045509f3a2187",
    });

    csv({
      noheader: false,
      headers: [
        "cnpj",
        "nome",
        "endereco",
        "complemento",
        "bairro",
        "cidade",
        "uf",
        "produto",
        "preco",
        "data",
      ],
      delimiter: ";",
      encoding: "utf-8",
    }).fromFile(file, function (err, result) {
      var json = result;
      console.log(json);
    });
    //   .then((postos) => {
    //     for (let i = 0; i < 5; i++) {
    //       geocoder.geocode(postos[i].endereco, function (err, result) {
    //         console.log(result);
    //       });
    //     }
    //   });
  },

  login: (req, res, next) => {
    res.render("login");
  },

  cadastroCpf: (req, res, next) => {
    res.render("cadastrocpf");
  },
  cadastroCnpj: (req, res, next) => {
    res.render("cadastrocnpj");
  },
  servicos: (req, res) => {
    res.render("servicos")
  },
};
