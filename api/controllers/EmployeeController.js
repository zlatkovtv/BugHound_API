const Sequelize = require('sequelize');

const Employee = require('../models/Employee');
const EmployeeProgram = require('../models/EmployeeProgram');

const authService = require('../services/AuthService');
const bcryptService = require('../services/BCryptService');

Employee.sync();
EmployeeProgram.sync();

// TESTED
exports.register = (req, res) => {
	const body = req.body;

	Employee.create(body)
		.then(employee => {
			var plain = employee.get({ plain: true });
			const token = authService().issue({ id: employee.id });
			delete plain.password;
			return res.status(201).json({ token, employee: plain });
		})
		.catch(Sequelize.ValidationError, err => {
			return res.status(400).json({msg: err.message});
		})
		.catch(err => {
			return res.status(500).json({msg: err.message});
		});
};

exports.login = async (req, res) => {
	const { username, password } = req.body;

	if (username && password) {
		try {
			const employee = await Employee
				.findOne({
					where: {
						username: username,
					},
				});

			if (!employee) {
				return res.status(400).json({ msg: 'Bad Request: User not found' });
			}

			if (bcryptService().comparePassword(password, employee.password)) {
				const token = authService().issue({ id: employee.id });
				delete employee.password;
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
			if (!employee) {
				return res.status(404).json({err: "Employee with such ID not found."});
			}

			var plain = employee.get({ plain: true });
			const token = 'PLACEHOLDER'
			return res.status(200).json({ token, employee: plain });
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({msg: err.message});
		});
};

// TESTED
exports.getAll = async (req, res) => {
	var programId = req.params.programId;
	var condition = {};
	if (programId) {
		condition["programid"] = programId;

		Employee.belongsTo(EmployeeProgram, { foreignKey: 'id'});
		EmployeeProgram.hasMany(Employee, { foreignKey: 'id' });
		EmployeeProgram.findAll({
			where: condition,
			include: [
				{
					model: Employee,
					required: true
				}
			]
		})
			.then(employees => {
				var emps = employees.map(em => em.Employees);
				emps = [].concat.apply([], emps);
				const token = "placeholder";
				//authService().issue({ id: employee.id });
				return res.status(200).json({ token, employees: emps });
			})
			.catch(err => {
				console.log(err);
				return res.status(500).json({msg: err.message});
			});
	} else {
		Employee.findAll({
			raw: true
		})
		.then(employees => {
			const token = 'PLACEHOLDER'
			return res.status(200).json({ token, employees: employees });
		})
		.catch(err => {
			return res.status(500).json({msg: err.message});
		});
	}
};

// TESTED
exports.updateEmployee = async (req, res) => {
	const body = req.body;

	Employee.findById(body.id)
		.then(foundEmployee => {
			if (!foundEmployee) {
				return res.status(404).json({err: "Employee with such ID not found."});
			}

			foundEmployee.update(body)
				.then(employee => {
					var plain = employee.get({ plain: true });
					const token = 'PLACEHOLDER'
					return res.status(200).json({ token, employee: plain });
				})
				.catch(Sequelize.ValidationError, err => {
					return res.status(400).json({msg: err.message});
				})
				.catch(err => {
					return res.status(500).json({msg: err.message});
				});

			
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({msg: err.message});
		});
};

// TESTED
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
		return res.status(500).json({msg: err.message});
	});
};
