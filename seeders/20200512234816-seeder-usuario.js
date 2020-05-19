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
          email: "lp@mail.com",
          senha: bcrypt.hashSync("123456", 10),
        },
        {
          nome: "Bruno",
          sobrenome: "Prata",
          email: "bp@mail.com",
          senha: bcrypt.hashSync("123456", 10),
        },
        {
          nome: "Mauricio",
          sobrenome: "Reis",
          email: "mr@mail.com",
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
