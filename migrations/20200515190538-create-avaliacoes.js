"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Avaliacoes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
      },
      usuarios_id: {
        type: Sequelize.INTEGER,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      postos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "postos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      texto: {
        type: Sequelize.TEXT,
      },
      nota: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Avaliacoes");
  },
};
