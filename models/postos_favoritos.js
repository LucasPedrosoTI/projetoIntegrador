"use strict";
module.exports = (sequelize, DataTypes) => {
  const postos_favoritos = sequelize.define(
    "postos_favoritos",
    {
      postos_id: DataTypes.INTEGER,
      usuarios_id: DataTypes.INTEGER,
    },
    {
      tablename: "postos_favoritos",
      timestamps: false,
    }
  );
  // postos_favoritos.associate = function(models) {
  //   // associations can be defined here
  // };
  return postos_favoritos;
};
