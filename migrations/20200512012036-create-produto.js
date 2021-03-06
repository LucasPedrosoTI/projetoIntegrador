"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Produtos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
      },
      nome: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Produtos");
  },
};
