'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('postos_anuncios', {
      postos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "postos", key: "id"}
      },
      anuncios_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "anuncios", key: "id"}
      }
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expire_date: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('postos_anuncios');
  }
};
// ok