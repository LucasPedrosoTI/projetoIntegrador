"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("postos_servicos", {
      postos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "postos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", //ALTERADO PARA CASCADE - SE UM POSTO É EXCLUÍDO, NÃO QUEREMOS MAIS OS SERVIÇOS DELES SENDO MOSTRADOS
      },
      servicos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "servicos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", //ALTERADO PARA CASCADE - SE UM SERVIÇO É EXCLUÍDO, NÃO QUEREMOS MAIS OS SERVIÇOS  SENDO MOSTRADOS
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("postos_servicos");
  },
};
// ok
