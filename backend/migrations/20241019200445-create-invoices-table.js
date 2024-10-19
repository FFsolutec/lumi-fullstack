module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Invoices", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clientNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      referenceMonth: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      energyConsumed: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalWithoutGD: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      savingsGD: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Invoices");
  },
};
