const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'bug';
const Bug = db.define('bug', {
	bugid: {
		field: 'BUGID',
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	programid: {
		field: 'PROGRAMID',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'program',
			key: 'ID'
		}
	},
	reporttype: {
		field: 'REPORT_TYPE',
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {
			min: 1,
			max: 6
		}
	},
	severity: {
		field: 'SEVERITY',
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {
			min: 1,
			max: 3
		}
	},
	problemsummary: {
		field: 'PROBLEM_SUMMARY',
		type: Sequelize.STRING(500),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 500]
		}
	},
	problemdescription: {
		field: 'PROBLEM_DESCRIPTION',
		type: Sequelize.STRING(2000),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 2000]
		}
	},
	suggestedfix: {
		field: 'SUGGESTED_FIX',
		type: Sequelize.STRING(2000),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 2000]
		}
	},
	reportedby: {
		field: 'REPORTED_BY',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employee',
			key: 'ID'
		}
	},
	datereported: {
		field: 'DATE_REPORTED',
		type: Sequelize.DATE,
		allowNull: false,
		validate: {
			isDate: true
		}
	},
	reproducible: {
		field: 'REPRODUCIBLE',
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	area: {
		field: 'AREA',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'area',
			key: 'ID'
		}
	},
	assignedto: {
		field: 'ASSIGNED_TO',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employee',
			key: 'ID'
		}
	},
	comments: {
		field: 'COMMENTS',
		type: Sequelize.STRING(2000),
		allowNull: true
	},
	priority: {
		field: 'PRIORITY',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {
			min: 1,
			max: 5
		}
	},
	status: {
		field: 'STATUS',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {
			min: 1,
			max: 2
		}
	},
	resolution: {
		field: 'RESOLUTION',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {
			min: 1,
			max: 9
		}
	},
	resolutionversion: {
		field: 'RESOLUTION_VERSION',
		type: Sequelize.STRING(10),
		allowNull: true
	},
	resolvedby: {
		field: 'RESOLVED_BY',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employee',
			key: 'ID'
		}
	},
	dateresolved: {
		field: 'DATE_RESOLVED',
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			isDate: true
		}
	},
	resolutiontestedby: {
		field: 'RESOLUTION_TESTED_BY',
		type: Sequelize.INTEGER(11),
		allowNull: true,
		references: {
			model: 'employee',
			key: 'ID'
		}
	},
	resolutiontesteddate: {
		field: 'RESOLUTION_TESTED_DATE',
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			isDate: true
		}
	},
	deferred: {
		field: 'DEFERRED',
		type: Sequelize.BOOLEAN,
		allowNull: true
	}
},
	{
		tableName: tableName,
		timestamps: false
	});

module.exports = Bug;