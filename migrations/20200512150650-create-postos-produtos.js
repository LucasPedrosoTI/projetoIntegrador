"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("postos_produtos", {
      postos_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "postos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      produtos_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "produtos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      preco: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("postos_produtos");
  },
};
// ok
