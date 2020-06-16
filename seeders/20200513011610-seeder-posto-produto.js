"use strict";

const produtos = require("../database/produtosResposta-50.json");

// let id = 1;
// let produtos_id;
// let postoProdutoArray = [];

// for (const posto of postos) {
//   posto.produto == "ETANOL" ? (produtos_id = 2) : (produtos_id = 1);

//   let instance = {
//     postos_id: id,
//     produtos_id,
//     preco: posto.preco,
//   };
//   id++;

//   postoProdutoArray.push(instance);
// }

// console.log(postoProdutoArray);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Postos_produtos", produtos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos_produtos", produtos, {});
  },
};
