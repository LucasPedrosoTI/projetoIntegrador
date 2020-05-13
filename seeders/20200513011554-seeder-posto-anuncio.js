"use strict";

var date = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Postos_anuncios",
      [
        {
          postos_id: 1,
          anuncios_id: 1,
          created_date: new Date(),
          expire_date: new Date(date.setTime(date.getTime() + 30 * 86400000)),
        },
        {
          postos_id: 1,
          anuncios_id: 3,
          created_date: new Date(),
          expire_date: new Date(date.setTime(date.getTime() + 180 * 86400000)),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos_anuncios", null, {});
  },
};
