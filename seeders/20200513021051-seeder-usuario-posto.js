"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Usuario_postos",
      [
        {
          email: "admin@posto.com",
          senha: bcrypt.hashSync("123456", 10),
          nome_proprietario: "Owner",
          cnpj: "12345678912345",
          postos_id: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Usuario_postos", null, {});
  },
};
