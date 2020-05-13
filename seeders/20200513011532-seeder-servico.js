"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Servicos",
      [
        {
          nome: "Borracharia",
        },
        {
          nome: "Lavagem",
        },
        {
          nome: "Conveniência",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Servicos", null, {});
  },
};
