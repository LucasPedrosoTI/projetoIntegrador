"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("postos_anuncios", {
      postos_id: {
        type: Sequelize.INTEGER,
        references: { model: "postos", key: "id" },
        onUpdate: "NO ACTION",
        onDelete: "SET NULL",
      },
      anuncios_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "anuncios", key: "id" },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      tipo_de_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      expire_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("postos_anuncios");
  },
};
// ok
