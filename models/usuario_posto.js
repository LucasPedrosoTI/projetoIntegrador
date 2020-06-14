"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario_Posto = sequelize.define(
    "Usuario_Posto",
    {
      email: DataTypes.STRING,
      nome_proprietario: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      senha: DataTypes.STRING,
      postos_id: DataTypes.INTEGER,
    },
    {
      tablename: "usuario_postos",
      timestamps: false,
    }
  );
  Usuario_Posto.associate = function (models) {
    // associations can be defined here
    Usuario_Posto.belongsTo(models.Posto, {
      foreignKey: "postos_id",
      as: "posto",
    });
  };
  return Usuario_Posto;
};
