"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario);
      this.belongsTo(models.Endereco);
      this.belongsTo(models.Cartao);
      this.hasMany(models.CompraItem);
    }
  }
  Compra.init(
    {
      usuarioId: DataTypes.INTEGER,
      enderecoId: DataTypes.INTEGER,
      cartaoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Compra",
    }
  );
  return Compra;
};
