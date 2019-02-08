/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('program', {
    NAME: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    DATE_STARTED: {
      type: DataTypes.DATE,
      allowNull: false
    },
    RELEASE: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    VERSION: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'program'
  });
};
