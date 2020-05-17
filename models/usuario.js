"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nome: DataTypes.STRING,
      sobrenome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      tablename: "usuarios",
      timestamps: false,
    }
  );
  Usuario.associate = function (models) {
    // associations can be defined here
    Usuario.belongsToMany(models.Posto, {
      through: models.postos_favoritos,
      foreignKey: "usuarios_id",
      as: "postos",
    });
  };
  return Usuario;
};
