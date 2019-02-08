/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bug', {
    BUGID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    PROGRAMID: {
      type: DataTypes.STRING(32),
      allowNull: true,
      references: {
        model: 'program',
        key: 'NAME'
      }
    },
    REPORT_TYPE: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    SEVERITY: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    PROBLEM_SUMMARY: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    PROBLEM_DESCRIPTION: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    SUGGESTED_FIX: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    REPORTED_BY: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'employeeprogram',
        key: 'ID'
      }
    },
    DATE_REPORTED: {
      type: DataTypes.DATE,
      allowNull: false
    },
    REPRODUCIBLE: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    AREA: {
      type: DataTypes.STRING(32),
      allowNull: true,
      references: {
        model: 'area',
        key: 'NAME'
      }
    },
    ASSIGNED_TO: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'employeeprogram',
        key: 'ID'
      }
    },
    COMMENTS: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    PRIORITY: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    STATUS: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    RESOLUTION: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    RESOLUTION_VERSION: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    RESOLVED_BY: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'employeeprogram',
        key: 'ID'
      }
    },
    DATE_RESOLVED: {
      type: DataTypes.DATE,
      allowNull: true
    },
    RESOLUTION_TESTED_BY: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'employeeprogram',
        key: 'ID'
      }
    },
    RESOLUTION_TESTED_DATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DEFERRED: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'bug'
  });
};
