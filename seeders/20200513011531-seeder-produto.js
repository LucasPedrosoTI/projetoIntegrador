"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Produtos",
      [
        {
          produto: "Gasolina",
        },
        {
          produto: "Etanol",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Produtos", null, {});
  },
};
