"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Produtos",
      [
        {
          nome: "Gasolina",
        },
        {
          nome: "Etanol",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Produtos", null, {});
  },
};
