const Employee = require('../models/Employee');
const EmployeeProgram = require('../models/EmployeeProgram');
const authService = require('../services/AuthService');
const bcryptService = require('../services/BCryptService');

Employee.sync();
Employee.beforeCreate(employee => {
	var errors = employee.validate();
	if (errors) {
		throw new Error(errors);
	}
});

Employee.beforeUpdate(employee => {
	var errors = employee.validate();
	if (errors) {
		throw new Error(errors);
	}
});

exports.register = (req, res) => {
	const body = req.body;

	Employee.create(body)
		.then(employee => {
			var plain = employee.get({ plain: true });
			const token = 'PLACEHOLDER'
			return res.status(201).json({ token, employee: plain });
		})
		.catch(Sequelize.ValidationError, err => {
			return res.status(400).json(err);
		})
		.catch(err => {
			return res.status(500).json(err);
		});
};

exports.login = async (req, res) => {
	const { username, password } = req.body;

	if (username && password) {
		try {
			const employee = await Employee
				.findOne({
					where: {
						email,
					},
				});

			if (!employee) {
				return res.status(400).json({ msg: 'Bad Request: User not found' });
			}

			if (bcryptService().comparePassword(password, employee.password)) {
				const token = authService().issue({ id: employee.id });

				return res.status(200).json({ token, user: employee });
			}

			return res.status(401).json({ msg: 'Unauthorized' });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: 'Internal server error' });
		}
	}

	return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
};

exports.validate = async (req, res) => {
	const { token } = req.body;

	authService().verify(token, (err) => {
		if (err) {
			return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
		}

		return res.status(200).json({ isvalid: true });
	});
};

exports.getEmployee = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		return res.status(404).json({ msg: "Employee not found or ID is missing." });
	}

	Employee.findById(id)
		.then(employee => {
			var plain = employee.get({ plain: true });
			const token = 'PLACEHOLDER'
			return res.status(200).json({ token, employee: plain });
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json(err);
		});
};

// TODO fix this
exports.getAll = async (req, res) => {
	var programId = req.params.programId;
	var condition = {};
	if (programId) {
		condition["programid"] = programId;
	}

	EmployeeProgram.query(
		`SELECT DISTINCT E.* FROM EMPLOYEES E
		JOIN EMPLOYEEPROGRAM EP ON E.ID = EP.EMPLOYEEID
		WHERE EP.PROGRAMID = :programid`,
		{
			model: EMPLOYEE,
			mapToModel: true,
			replacements: condition
		})
		.then(employees => {
			var plain = employees.get({ plain: true });
			const token = "placeholder";
			//authService().issue({ id: employee.id });
			return res.status(200).json({ token, employees: plain });
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({ msg: err });
		});
};

exports.updateEmployee = async (req, res) => {
	const body = req.body;

	Employee.findById(body.id)
		.then(foundEmployee => {
			if (foundEmployee) {
				foundEmployee.update(body)
					.then(employee => {
						var plain = employee.get({ plain: true });
						const token = 'PLACEHOLDER'
						return res.status(200).json({ token, employee: plain });
					})
					.catch(Sequelize.ValidationError, err => {
						return res.status(400).json(err);
					})
					.catch(err => {
						return res.status(500).json(err);
					});
			}

			return res.status(404).json({err: "Employee with such ID not found."});
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json(err);
		});
};

exports.deleteEmployee = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		return res.status(404).json({ msg: "Employee not found or ID is missing." });
	}

	Employee.destroy({
		where: {
			id: id
		}
	})
	.then(employee => {
		const token = 'PLACEHOLDER';
		return res.status(200).json({ msg: "Employee deleted successfully." });
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json(err);
	});
};
