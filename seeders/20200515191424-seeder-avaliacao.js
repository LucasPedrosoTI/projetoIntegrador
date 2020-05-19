"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Avaliacoes",
      [
        {
          usuarios_id: 1,
          postos_id: 1,
          texto: "Esse posto é ótimo",
          nota: 4.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 1,
          postos_id: 2,
          texto: "Lavagem caprichada",
          nota: 3.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 1,
          postos_id: 3,
          texto: "Esse posto é ótimo",
          nota: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 1,
          postos_id: 4,
          texto: "Lavagem caprichada",
          nota: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 2,
          postos_id: 1,
          texto: "Gasolina adulterada, não recomendo.",
          nota: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 2,
          postos_id: 3,
          texto: "Melhor gasolina do bairro",
          nota: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 3,
          postos_id: 1,
          texto: "Ótimo atendimento!",
          nota: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 3,
          postos_id: 3,
          texto: "Péssimo atendimento!",
          nota: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarios_id: 3,
          postos_id: 4,
          texto: "Bom custo benefício!",
          nota: 3.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Avaliacoes", null, {});
  },
};
