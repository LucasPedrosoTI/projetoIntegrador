'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('postos_servicos', {
      preco: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      postos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "postos", key: "id" },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      servicos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "servico", key: "id" },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('postos_servicos');
  }
};
// ok