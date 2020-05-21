"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Postos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      bandeira: {
        type: Sequelize.STRING,
        defaultValue: "Branca",
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },
      create_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      update_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Postos");
  },
};
