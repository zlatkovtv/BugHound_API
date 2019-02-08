/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('area', {
    NAME: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'area'
  });
};
