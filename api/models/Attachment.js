/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attachment', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    FILENAME: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    DATE_SUBMITTED: {
      type: DataTypes.DATE,
      allowNull: true
    },
    BUGID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'bug',
        key: 'BUGID'
      }
    }
  }, {
    tableName: 'attachment'
  });
};
