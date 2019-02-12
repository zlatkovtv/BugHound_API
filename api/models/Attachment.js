const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'attachment';
const Attachment = db.define('attachment', {
	id: {
		field: 'ID',
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	filename: {
		field: 'FILENAME',
		type: Sequelize.STRING(100),
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [4, 100]
		}
	},
	datesubmitted: {
		field: 'DATE_SUBMITTED',
		type: Sequelize.DATE,
		allowNull: true,
		validate: {
			notEmpty: true,
			isDate: true
		}
	},
	bugid: {
		field: 'BUGID',
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