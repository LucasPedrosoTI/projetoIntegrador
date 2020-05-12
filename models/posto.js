'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posto = sequelize.define('Posto', {
    nome_fantasia: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    cep: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    bairro: DataTypes.STRING,
    bandeira: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {});
  Posto.associate = function(models) {
    // associations can be defined here
  };
  return Posto;
};