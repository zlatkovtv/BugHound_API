const hooks = {
	beforeCreate(user) {
		user.password = bCryptService().password(user); // eslint-disable-line no-param-reassign
	},
};

const tableName = 'employees';

module.exports = function (sequelize, DataTypes) {
	const Employee = sequelize.define('Employee', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		FIRSTNAME: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		LASTNAME: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		PASSWORD: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		EMAIL: {
			type: DataTypes.STRING(32),
			allowNull: true
		},
		PHONE: {
			type: DataTypes.STRING(12),
			allowNull: true
		}
	}, { hooks, tableName });

	Employee.toJSON = function () {
		const values = Object.assign({}, this.get());

		delete values.password;

		return values;
	};

	return Employee
};