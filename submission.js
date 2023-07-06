const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Submission = sequelize.define('Submission', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resumePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Submission;
