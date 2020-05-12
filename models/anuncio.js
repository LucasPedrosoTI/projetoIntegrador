'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anuncio = sequelize.define('Anuncio', {
    nome: DataTypes.STRING,
    preco: DataTypes.DECIMAL
  }, {});
  Anuncio.associate = function(models) {
    // associations can be defined here
  };
  return Anuncio;
};