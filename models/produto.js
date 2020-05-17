"use strict";
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      nome: DataTypes.STRING,
    },
    {
      tablename: "produtos",
      timestamps: false,
    }
  );
  Produto.associate = function (models) {
    // associations can be defined here
    Produto.belongsToMany(models.Posto, {
      through: models.postos_produtos,
      foreignKey: "produtos_id",
      as: "postos",
    });
  };
  return Produto;
};
