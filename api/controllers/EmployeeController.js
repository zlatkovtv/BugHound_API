const Employee = require('../models/Employee')
const authService = require('../services/AuthService');
const bcryptService = require('../services/BCryptService');

exports.register = (req, res) => {
	const body = req.body;
	console.log(Employee);
	if(!body.email || !body.password) {
		return res.status(400).json({ msg: body });
	}

	Employee.create({
		FIRSTNAME: body.firstName,
		LASTNAME: body.lastName,
		PASSWORD: body.password,
		EMAIL: body.email,
		PHONE: body.phone
	})
	.then(employee => {
		const token = authService().issue({ id: employee.id });
		return res.status(200).json({ token, user: employee });
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

exports.getEmployee = async (req, res) => { };
exports.getAll = async (req, res) => { };
exports.updateEmployee = async (req, res) => { };
exports.deleteEmployee = async (req, res) => { };