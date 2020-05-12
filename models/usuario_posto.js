'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario_Posto = sequelize.define('Usuario_Posto', {
    email: DataTypes.STRING,
    nome_proprietario: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    senha: DataTypes.STRING,
    postos_id: DataTypes.INTEGER
  }, {});
  Usuario_Posto.associate = function(models) {
    // associations can be defined here
  };
  return Usuario_Posto;
};