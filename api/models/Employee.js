const Sequelize = require('sequelize');
const bcryptService = require('../services/BCryptService');

const db = require('../../config/SequelizeFactory');

const hooks = {
	beforeCreate(user) {
		user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
	},
};

const tableName = 'employee';

const User = db.define('Employee', {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		field: 'ID'
	},
	firstname: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'FIRSTNAME'
	},
	lastname: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'LASTNAME'
	},
	username: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'USERNAME'
	},
	password: {
		type: Sequelize.STRING(128),
		allowNull: false,
		field: 'PASSWORD'
	},
	email: {
		type: Sequelize.STRING(32),
		allowNull: true,
		field: 'EMAIL'
	},
	phone: {
		type: Sequelize.STRING(12),
		allowNull: true,
		field: 'PHONE'
	},
	userlevel: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: 'USER_LEVEL'
	}
}, 
{
	hooks: hooks, 
	tableName: tableName,
	timestamps: false
});

// eslint-disable-next-line
User.prototype.toJSON = function () {
	const values = Object.assign({}, this.get());

	delete values.password;

	return values;
};

module.exports = User;