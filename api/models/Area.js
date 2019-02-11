const Sequelize = require('sequelize');
const db = require('../../config/SequelizeFactory');

const tableName = 'area';
const Area = db.define('area', {
	name: {
		type: Sequelize.STRING(32),
		allowNull: false,
		primaryKey: true,
		field: 'NAME',
		validate: {
			notEmpty: true,
			len: [2, 32]
		},
		unique: true
	}
},
	{
		tableName: tableName,
		timestamps: false
	});

module.exports = Area;