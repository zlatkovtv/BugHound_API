const Sequelize = require('sequelize');
const bcryptService = require('../services/BCryptService');

const db = require('../../config/SequelizeFactory');

const hooks = {
	beforeCreate(user) {
		user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
	},
	beforeUpdate(user) {
		user.password = bcryptService().password(user);
	}
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
		field: 'FIRSTNAME',
		validate: {
			notEmpty: true,
			len: [1, 32]
		}
	},
	lastname: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'LASTNAME',
		validate: {
			notEmpty: true,
			len: [1, 32]
		}
	},
	username: {
		type: Sequelize.STRING(32),
		allowNull: false,
		field: 'USERNAME',
		validate: {
			notEmpty: true,
			len: [5, 32]
		},
		unique: true
	},
	password: {
		type: Sequelize.STRING(128),
		allowNull: false,
		field: 'PASSWORD',
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING(32),
		allowNull: true,
		field: 'EMAIL',
		validate: {
			isEmail: true,
			notEmpty: true,
			len: [4, 32]
		},
		unique: true
	},
	phone: {
		type: Sequelize.STRING(12),
		allowNull: true,
		field: 'PHONE',
		validate: {
			notEmpty: true,
			len: [5, 12]
		}
	},
	userlevel: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: 'USER_LEVEL',
		validate: {
			min: 1
		}
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