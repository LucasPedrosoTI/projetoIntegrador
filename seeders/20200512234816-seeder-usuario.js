"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Usuarios",
      [
        {
          nome: "Lucas",
          sobrenome: "Pedroso",
          email: "lucas@gmail.com",
          senha: bcrypt.hashSync("123456", 10),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Usuarios", null, {});
  },
};
