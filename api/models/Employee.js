const Sequelize = require('sequelize');
const bcryptService = require('../services/BCryptService');

const sequelize = require('../../config/Database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'employee';

const User = sequelize.define('Employee', {
	ID: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	FIRSTNAME: {
		type: Sequelize.STRING(32),
		allowNull: false
	},
	LASTNAME: {
		type: Sequelize.STRING(32),
		allowNull: false
	},
	USERNAME: {
		type: Sequelize.STRING(32),
		allowNull: false
	},
	PASSWORD: {
		type: Sequelize.STRING(128),
		allowNull: false
	},
	EMAIL: {
		type: Sequelize.STRING(32),
		allowNull: true
	},
	PHONE: {
		type: Sequelize.STRING(12),
		allowNull: true
	},
	USER_LEVEL: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	}
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;