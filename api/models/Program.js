const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'program'

const Program = db.define('Program', {
	name: {
		type: Sequelize.STRING(32),
		allowNull: false,
		primaryKey: true,
		field: 'NAME'
	},
	datestarted: {
		type: Sequelize.DATE,
		allowNull: false,
		field: 'DATE_STARTED'
	},
	release: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: 'RELEASE'
	},
	version: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: 'VERSION'
	}
},
{
	tableName: tableName,
	timestamps: false
});

module.exports = Program;