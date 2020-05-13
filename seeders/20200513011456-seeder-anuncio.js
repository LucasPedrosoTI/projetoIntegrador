"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Anuncios",
      [
        {
          nome: "Mensal",
          preco: 100,
        },
        {
          nome: "Trimestral",
          preco: 290,
        },
        {
          nome: "Semestral",
          preco: 550,
        },
        {
          nome: "Anual",
          preco: 1000,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Anuncios", null, {});
  },
};
