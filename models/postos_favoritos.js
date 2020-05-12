'use strict';
module.exports = (sequelize, DataTypes) => {
  const postos_favoritos = sequelize.define('postos_favoritos', {
    postos_id: DataTypes.INTEGER,
    usuarios_id: DataTypes.INTEGER
  }, {});
  postos_favoritos.associate = function(models) {
    // associations can be defined here
  };
  return postos_favoritos;
};