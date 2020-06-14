"use strict";
module.exports = (sequelize, DataTypes) => {
  const postos_anuncios = sequelize.define(
    "postos_anuncios",
    {
      postos_id: DataTypes.INTEGER,
      anuncios_id: DataTypes.INTEGER,
      tipo_de_pagamento: DataTypes.STRING,
      created_date: DataTypes.DATE,
      expire_date: DataTypes.DATE,
    },
    {
      tablename: "postos_anuncios",
      timestamps: false,
    }
  );

  return postos_anuncios;
};
