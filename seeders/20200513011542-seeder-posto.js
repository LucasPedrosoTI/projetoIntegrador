"use strict";

const postos = require("../database/postosResposta-50.json");
const moment = require("moment");

for (const posto of postos) {
  let novaData = moment(posto.update_time, "DD/MM/YYYY").format("YYYY/MM/DD");
  posto.create_time = new Date();
  posto.update_time = new Date(novaData);
  // console.log(posto.create_time);
  // console.log(posto.update_time);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Postos", postos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos", postos, {});
  },
};
