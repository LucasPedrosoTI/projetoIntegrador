"use strict";
module.exports = (sequelize, DataTypes) => {
  const Posto = sequelize.define(
    "Posto",
    {
      nome: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      cep: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      bairro: DataTypes.STRING,
      endereco: DataTypes.STRING,
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
      timestamps: false,
    }
  );
  Posto.associate = function (models) {
    // associations can be defined here
    Posto.belongsToMany(models.Usuario, {
      through: models.postos_favoritos,
      foreignKey: "postos_id",
      as: "usuarios",
    });
    Posto.belongsToMany(models.Produto, {
      through: models.postos_produtos,
      foreignKey: "postos_id",
      as: "produtos",
    });
    Posto.belongsToMany(models.Usuario, {
      through: models.Avaliacoes,
      foreignKey: "postos_id",
      as: "avaliacoes",
    });
    Posto.belongsToMany(models.Servico, {
      through: models.postos_servicos,
      foreignKey: "postos_id",
      as: "servicos",
    });
  };
  return Posto;
};
