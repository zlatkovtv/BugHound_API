const Sequelize = require('sequelize');
const sequelize = require('../../config/Database');

const tableName = 'area';
const Area = sequelize.define('area', {
    NAME: {
      type: Sequelize.STRING(32),
      allowNull: false,
      primaryKey: true
    }
  },
  {
    tableName: tableName,
    timestamps: false
  });
  
  module.exports = Area;