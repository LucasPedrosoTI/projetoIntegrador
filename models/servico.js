'use strict';
module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define('Servico', {
    servico: DataTypes.STRING
  }, {});
  Servico.associate = function(models) {
    // associations can be defined here
  };
  return Servico;
};