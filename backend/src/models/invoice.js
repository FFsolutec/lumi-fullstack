const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Invoice = sequelize.define("Invoice", {
  clientNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  referenceMonth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  energyConsumed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  energyCompensated: {
    type: DataTypes.FLOAT,
  },
  totalWithoutGD: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  savingsGD: {
    type: DataTypes.FLOAT,
  },
});

module.exports = Invoice;
