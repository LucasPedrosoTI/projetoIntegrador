"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("postos_favoritos", {
      postos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "postos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      usuarios_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("postos_favoritos");
  },
};
// ok