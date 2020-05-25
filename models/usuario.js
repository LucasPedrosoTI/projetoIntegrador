"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nome: DataTypes.STRING,
      sobrenome: DataTypes.STRING,
      email: DataTypes.STRING,
      produtos_id: DataTypes.TINYINT,
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
    Usuario.belongsToMany(models.Posto, {
      through: models.Avaliacoes,
      foreignKey: "usuarios_id",
      as: "avaliacoes",
    });
    Usuario.belongsTo(models.Produto, {
      foreignKey: "produtos_id",
      as: "produtos",
    });
  };
  return Usuario;
};
