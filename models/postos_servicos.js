'use strict';
module.exports = (sequelize, DataTypes) => {
  const postos_servicos = sequelize.define('postos_servicos', {
    preco: DataTypes.FLOAT,
    postos_id: DataTypes.INTEGER,
    servicos_id: DataTypes.INTEGER
  }, {});
  postos_servicos.associate = function(models) {
    // associations can be defined here
  };
  return postos_servicos;
};