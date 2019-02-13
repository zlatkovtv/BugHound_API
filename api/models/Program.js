const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'program'

const Program = db.define('Program', {
	name: {
		type: Sequelize.STRING(32),
		allowNull: false,
		primaryKey: true,
		field: 'NAME',
		validate: {
			len: [2, 32],
			isEmpty: false
		}
	},
	datestarted: {
		type: Sequelize.DATE,
		allowNull: false,
		field: 'DATE_STARTED',
		validate: {
			isDate: true
		}
	},
	release: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'RELEASE',
		validate: {
			isEmpty: false
		}
	},
	version: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'VERSION',
		validate: {
			isEmpty: false
		}
	}
},
{
	tableName: tableName,
	timestamps: false
});

module.exports = Program;