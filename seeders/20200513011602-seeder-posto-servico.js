"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Postos_servicos",
      [
        {
          postos_id: 1,
          servicos_id: 1,
          preco: 15,
        },
        {
          postos_id: 1,
          servicos_id: 2,
          preco: 30,
        },
        {
          postos_id: 1,
          servicos_id: 3,
          preco: 0,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos_servicos", null, {});
  },
};
