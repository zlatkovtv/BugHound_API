const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'bug';
const Bug = db.define('bug', {
	BUGID: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	PROGRAMID: {
		type: Sequelize.STRING(32),
		allowNull: true,
		references: {
			model: 'program',
			key: 'NAME'
		},
		validate: {
			notEmpty: true,
			len: [1, 32]
		}
	},
	REPORT_TYPE: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {
			min: 1,
			max: 6
		}
	},
	SEVERITY: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {
			min: 1,
			max: 3
		}
	},
	PROBLEM_SUMMARY: {
		type: Sequelize.STRING(500),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 500]
		}
	},
	PROBLEM_DESCRIPTION: {
		type: Sequelize.STRING(2000),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 2000]
		}
	},
	SUGGESTED_FIX: {
		type: Sequelize.STRING(2000),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 2000]
		}
	},
	REPORTED_BY: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employeeprogram',
			key: 'ID'
		}
	},
	DATE_REPORTED: {
		type: Sequelize.DATE,
		allowNull: false,
		validate: {
			isDate: true
		}
	},
	REPRODUCIBLE: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	AREA: {
		type: Sequelize.STRING(32),
		allowNull: true,
		references: {
			model: 'area',
			key: 'NAME'
		}
	},
	ASSIGNED_TO: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employeeprogram',
			key: 'ID'
		}
	},
	COMMENTS: {
		type: Sequelize.STRING(2000),
		allowNull: true
	},
	PRIORITY: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {
			min: 1,
			max: 5
		}
	},
	STATUS: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {
			min: 1,
			max: 2
		}
	},
	RESOLUTION: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {
			min: 1,
			max: 9
		}
	},
	RESOLUTION_VERSION: {
		type: Sequelize.STRING(10),
		allowNull: true
	},
	RESOLVED_BY: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employeeprogram',
			key: 'ID'
		}
	},
	DATE_RESOLVED: {
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			isDate: true
		}
	},
	RESOLUTION_TESTED_BY: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employeeprogram',
			key: 'ID'
		}
	},
	RESOLUTION_TESTED_DATE: {
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			isDate: true
		}
	},
	DEFERRED: {
		type: Sequelize.BOOLEAN,
		allowNull: true
	}
},
	{
		tableName: tableName,
		timestamps: false
	});

module.exports = Bug;