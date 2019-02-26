const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'program'

const Program = db.define('Program', {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		field: 'ID'
	},
	name: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'NAME',
		validate: {
			notEmpty: true,
			len: [1, 32]
		}
	},
	datestarted: {
		type: Sequelize.DATE,
		allowNull: false,
		field: 'DATE_STARTED'
	},
	release: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'RELEASE',
		validate: {
			notEmpty: true,
			len: [1, 32]
		}
	},
	version: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'VERSION',
		validate: {
			notEmpty: true,
			len: [1, 32]
		}
	}
},
{
	tableName: tableName,
	timestamps: false
});

module.exports = Program;