"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Pagamentos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
      },
      data_pagamento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tipo_de_pagamento: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      anuncios_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "anuncios", key: "id" },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Pagamentos");
  },
};
