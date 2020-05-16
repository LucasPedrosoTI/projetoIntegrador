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
    if (req.session.usuario) {
      res.render("dashboard-usuario", { user: req.session.usuario.dataValues });
    }

    res.render("login", { error: null });
  },

  cadastro: (req, res, next) => {
    if (req.session.usuario) {
      res.redirect("dashboard-usuario");
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

  dashboardUsuario: (req, res) => {
    res.render("dashboard-usuario", { user: req.session.usuario.dataValues });
  },
};
