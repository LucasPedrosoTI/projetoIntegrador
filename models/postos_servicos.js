"use strict";
module.exports = (sequelize, DataTypes) => {
  const postos_servicos = sequelize.define(
    "postos_servicos",
    {
      preco: DataTypes.FLOAT,
      postos_id: DataTypes.INTEGER,
      servicos_id: DataTypes.INTEGER,
    },
    { tablename: "postos_servicos", timestamps: false }
  );
  return postos_servicos;
};
