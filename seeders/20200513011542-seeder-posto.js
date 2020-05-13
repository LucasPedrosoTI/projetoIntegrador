"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Postos",
      [
        {
          nome_fantasia: "Posto 1",
          cnpj: "12345678912345",
          cep: "12345678",
          cidade: "São Paulo",
          estado: "SP",
          bairro: "Centro",
          bandeira: "Ipiranga",
          latitude: -23.5113429,
          longitude: -46.3912693,
          create_time: new Date(),
          update_time: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos", null, {});
  },
};
