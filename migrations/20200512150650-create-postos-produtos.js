'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('postos_produtos', {
      postos_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "postos", key: "id"}
      },
      produtos_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "produtos", key: "id"}
      },
      preco: {
        allowNull: false,
        type: Sequelize.FLOAT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('postos_produtos');
  }
};
// ok