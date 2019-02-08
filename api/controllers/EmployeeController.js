const Employee = require('../models/Employee')
const authService = require('../services/AuthService');
const bcryptService = require('../services/BCryptService');

exports.register = (req, res) => {
	const body = req.body;
	console.log(body);
	if (!body.username || !body.password || !body.firstname || !body.lastname) {
		return res.status(400).json({ msg: "Body is in incorrect format." });
	}

	Employee.create({
		FIRSTNAME: body.firstname,
		LASTNAME: body.lastname,
		USERNAME: body.username,
		PASSWORD: body.password,
		EMAIL: body.email,
		PHONE: body.phone,
		USER_LEVEL: body.userlevel
	})
		.then(employee => {
			const token = authService().issue({ id: employee.id });
			return res.status(200).json({ token, employee: {
				"id": employee.ID,
				"firstname": employee.FIRSTNAME,
				"lastname": employee.LASTNAME,
				"username": employee.USERNAME,
				"userlevel": employee.USER_LEVEL,
				"email": employee.EMAIL,
				"phone": employee.PHONE
			}});
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({ msg: err });
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
	const id = req.param("id");
	if (!id) {
		return res.status(404).json({ msg: "Employee not found or ID is missing." });
	}

	Employee.findById(id)
	.then(employee => {
		console.log(employee)
		const token = authService().issue({ id: employee.id });
		return res.status(200).json({ token, employee: {
			"id": employee.ID,
			"firstname": employee.FIRSTNAME,
			"lastname": employee.LASTNAME,
			"username": employee.USERNAME,
			"userlevel": employee.USER_LEVEL,
			"email": employee.EMAIL,
			"phone": employee.PHONE
		}});
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({ msg: err });
	});
};

exports.getAll = async (req, res) => {
	Employee.findAll({
		raw: true
	})
	.then(employees => {
		var formatted = employees.map(employee => ({
			"id": employee.ID,
			"firstname": employee.FIRSTNAME,
			"lastname": employee.LASTNAME,
			"username": employee.USERNAME,
			"userlevel": employee.USER_LEVEL,
			"email": employee.EMAIL,
			"phone": employee.PHONE
		}));
		const token = "placeholder";
		//authService().issue({ id: employee.id });
		return res.status(200).json({ token, employees: formatted });
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({ msg: err });
	});
};

exports.updateEmployee = async (req, res) => {
	const body = req.body;
	if (!body.id || !body.username || !body.password || !body.firstname || !body.lastname) {
		return res.status(400).json({ msg: "Body is in incorrect format." });
	}
	
	Employee.findById(body.id)
	.then(foundEmployee => {
		console.log(body.id);
		console.log(foundEmployee);
		if(foundEmployee) {
			console.log("found");
			foundEmployee.update({
				FIRSTNAME: body.firstname,
				LASTNAME: body.lastname,
				USERNAME: body.username,
				PASSWORD: body.password,
				EMAIL: body.email,
				PHONE: body.phone,
				USER_LEVEL: body.userlevel
			})
			.then(employee => {
				console.log("success");
				const token = authService().issue({ id: employee.id });
				return res.status(200).json({ token, employee: {
					"id": employee.ID,
					"firstname": employee.FIRSTNAME,
					"lastname": employee.LASTNAME,
					"username": employee.USERNAME,
					"userlevel": employee.USER_LEVEL,
					"email": employee.EMAIL,
					"phone": employee.PHONE
				}});
			})
			.catch(err => {
				console.log(err);
				return res.status(500).json({ msg: err });
			});;
		}
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({ msg: err });
	});
};

exports.deleteEmployee = async (req, res) => {
	
};
