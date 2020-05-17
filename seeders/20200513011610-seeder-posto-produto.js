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
        {
          postos_id: 2,
          produtos_id: 1,
          preco: 3.69,
        },
        {
          postos_id: 2,
          produtos_id: 2,
          preco: 2.29,
        },
        {
          postos_id: 3,
          produtos_id: 1,
          preco: 3.79,
        },
        {
          postos_id: 3,
          produtos_id: 2,
          preco: 2.09,
        },
        {
          postos_id: 4,
          produtos_id: 1,
          preco: 3.19,
        },
        {
          postos_id: 4,
          produtos_id: 2,
          preco: 2.49,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos_produtos", null, {});
  },
};
