"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Postos_favoritos",
      [
        {
          usuarios_id: 1,
          postos_id: 1,
        },
        {
          usuarios_id: 1,
          postos_id: 2,
        },
        {
          usuarios_id: 1,
          postos_id: 3,
        },
        {
          usuarios_id: 1,
          postos_id: 4,
        },
        {
          usuarios_id: 2,
          postos_id: 1,
        },
        {
          usuarios_id: 2,
          postos_id: 3,
        },
        {
          usuarios_id: 2,
          postos_id: 4,
        },
        {
          usuarios_id: 3,
          postos_id: 2,
        },
        {
          usuarios_id: 3,
          postos_id: 3,
        },
        {
          usuarios_id: 3,
          postos_id: 4,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos_favoritos", null, {});
  },
};
