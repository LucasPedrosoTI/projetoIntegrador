"use strict";
module.exports = (sequelize, DataTypes) => {
  const Anuncio = sequelize.define(
    "Anuncio",
    {
      nome: DataTypes.STRING,
      preco: DataTypes.DECIMAL,
    },
    {
      tablename: "anuncios",
      timestamps: false,
    }
  );
  Anuncio.associate = function (models) {
    // associations can be defined here
    Anuncio.belongsToMany(models.Posto, {
      through: models.postos_anuncios,
      foreignKey: "anuncios_id",
      as: "postos",
    });
  };
  return Anuncio;
};
