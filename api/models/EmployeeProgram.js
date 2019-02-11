const Sequelize = require('sequelize');
const sequelize = require('../../config/Database');

const EmployeeProgram = sequelize.define('employeeprogram', {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		field: 'ID'
	},
	employeeid: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		references: {
			model: 'employee',
			key: 'ID'
		},
		field: 'EMPLOYEEID'
	},
	programid: {
		type: Sequelize.STRING(32),
		allowNull: false,
		references: {
			model: 'program',
			key: 'NAME'
		},
		field: 'PROGRAMID'
	}
}, {
		tableName: 'employeeprogram',
		timestamps: false
	});

module.exports = EmployeeProgram;

