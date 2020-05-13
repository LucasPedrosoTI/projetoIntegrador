"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Usuario_Postos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      nome_proprietario: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "postos", key: "id" },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Usuario_Postos");
  },
};
