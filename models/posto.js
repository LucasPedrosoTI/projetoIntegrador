"use strict";
module.exports = (sequelize, DataTypes) => {
  const Posto = sequelize.define(
    "Posto",
    {
      nome_fantasia: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      cep: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      bairro: DataTypes.STRING,
      bandeira: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      create_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      update_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tablename: "postos",
    }
  );
  Posto.associate = function (models) {
    // associations can be defined here
    Posto.belongsToMany(models.Usuario, {
      through: "postos_favoritos",
      foreignKey: "postos_id",
      as: "postos",
    });
  };
  return Posto;
};
