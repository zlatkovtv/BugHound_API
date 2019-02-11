const Sequelize = require('sequelize');
const sequelize = require('../../config/Database');

const tableName = 'area';
const Area = sequelize.define('area', {
    name: {
      type: Sequelize.STRING(32),
      allowNull: false,
      primaryKey: true,
      field: 'NAME'
    }
  },
  {
    tableName: tableName,
    timestamps: false
  });
  
  module.exports = Area;