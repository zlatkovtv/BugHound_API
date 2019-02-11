const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'attachment';
const Attachment = db.define('attachment', {
	ID: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	FILENAME: {
		type: Sequelize.STRING(100),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [4, 100]
		}
	},
	DATE_SUBMITTED: {
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			notEmpty: true,
			isDate: true
		}
	},
	BUGID: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		references: {
			model: 'bug',
			key: 'BUGID'
		},
		validate: {
			min: 1
		}
	}
},
	{
		tableName: tableName,
		timestamps: false
	});

module.exports = Attachment;