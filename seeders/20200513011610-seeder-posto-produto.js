"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Postos_produtos",
      [
        {
          postos_id: 1,
          produtos_id: 1,
          preco: 3.59,
        },
        {
          postos_id: 1,
          produtos_id: 2,
          preco: 2.19,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos_produtos", null, {});
  },
};
