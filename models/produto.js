'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    produto: DataTypes.STRING
  }, {});
  Produto.associate = function(models) {
    // associations can be defined here
  };
  return Produto;
};