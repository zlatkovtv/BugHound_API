/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeprogram', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    EMPLOYEEID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'employee',
        key: 'ID'
      }
    },
    PROGRAMID: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'program',
        key: 'NAME'
      }
    }
  }, {
    tableName: 'employeeprogram'
  });
};
