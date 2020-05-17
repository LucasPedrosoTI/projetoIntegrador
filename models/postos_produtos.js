"use strict";
module.exports = (sequelize, DataTypes) => {
  const postos_produtos = sequelize.define(
    "postos_produtos",
    {
      postos_id: DataTypes.INTEGER,
      produtos_id: DataTypes.INTEGER,
      preco: DataTypes.FLOAT,
    },
    {
      tablename: "postos_produtos",
      timestamps: false,
    }
  );
  // postos_produtos.associate = function (models) {
  //   // associations can be defined here
  // };
  return postos_produtos;
};
