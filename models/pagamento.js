'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define('Pagamento', {
    data_pagamento: DataTypes.DATE,
    tipo_de_pagamento: DataTypes.STRING,
    anuncios_id: DataTypes.INTEGER
  }, {});
  Pagamento.associate = function(models) {
    // associations can be defined here
  };
  return Pagamento;
};