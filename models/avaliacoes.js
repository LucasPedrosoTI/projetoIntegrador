"use strict";
module.exports = (sequelize, DataTypes) => {
  const Avaliacoes = sequelize.define(
    "Avaliacoes",
    {
      usuarios_id: DataTypes.INTEGER,
      postos_id: DataTypes.INTEGER,
      texto: DataTypes.STRING,
      nota: DataTypes.TINYINT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tablename: "avaliacoes",
    }
  );
  // Avaliacoes.associate = function (models) {
  //   // associations can be defined here
  // };
  return Avaliacoes;
};
