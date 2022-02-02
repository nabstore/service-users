'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Compras", {
      fields: ["usuarioId"],
      type: "foreign key",
      name: "usuarioCompraFk",
      references: {
        table: "Usuarios",
        field: "id",
      },
      onDelete: "restrict",
      onUpdate: "restrict",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Compras", "usuarioCompraFk");
  }
};
