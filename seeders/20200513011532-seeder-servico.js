'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Servicos',
      [
        {
          servico: 'Borracharia',
        },
        {
          servico: 'Lavagem',
        },
        {
          servico: 'Conveniência',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Servicos', null, {});
  },
};
