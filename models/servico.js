"use strict";
module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define(
    "Servico",
    {
      nome: DataTypes.STRING,
    },
    { tablename: "servicos", timestamps: false }
  );
  Servico.associate = function (models) {
    // associations can be defined here
    Servico.belongsToMany(models.Posto, {
      through: models.postos_servicos,
      foreignKey: "servicos_id",
      as: "postos",
    });
  };
  return Servico;
};
