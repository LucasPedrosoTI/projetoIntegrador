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
        {
          nome_fantasia: "Posto 2",
          cnpj: "12345678912346",
          cep: "12345678",
          cidade: "São Paulo",
          estado: "SP",
          bairro: "Centro",
          bandeira: "Petrobrás",
          latitude: -23.511343,
          longitude: -46.3912694,
          create_time: new Date(),
          update_time: new Date(),
        },
        {
          nome_fantasia: "Posto 3",
          cnpj: "12345678912347",
          cep: "12345678",
          cidade: "São Paulo",
          estado: "SP",
          bairro: "Centro",
          bandeira: "Shell",
          latitude: -23.5113431,
          longitude: -46.3912695,
          create_time: new Date(),
          update_time: new Date(),
        },
        {
          nome_fantasia: "Posto 4",
          cnpj: "12345678912348",
          cep: "12345678",
          cidade: "São Paulo",
          estado: "SP",
          bairro: "Centro",
          bandeira: "Branca",
          latitude: -23.5113428,
          longitude: -46.3912696,
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
