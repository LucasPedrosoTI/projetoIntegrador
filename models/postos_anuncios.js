'use strict';
module.exports = (sequelize, DataTypes) => {
  const postos_anuncios = sequelize.define('postos_anuncios', {
    postos_id: DataTypes.INTEGER,
    anuncios_id: DataTypes.INTEGER
  }, {});
  postos_anuncios.associate = function(models) { 
    
  };
  return postos_anuncios;
};