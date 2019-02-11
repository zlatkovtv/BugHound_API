const Sequelize = require('sequelize');
const sequelize = require('../../config/Database');

const tableName = 'attachment';
const Attachment = sequelize.define('attachment', {
    ID: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    FILENAME: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    DATE_SUBMITTED: {
      type: Sequelize.DATE,
      allowNull: true
    },
    BUGID: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'bug',
        key: 'BUGID'
      }
    }
  },
  {
    tableName: tableName,
    timestamps: false
  });
  
  module.exports = Attachment;