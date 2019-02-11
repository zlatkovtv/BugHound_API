const EmployeeProgram = require('../models/EmployeeProgram');
const Program = require('../models/Program');

EmployeeProgram.sync();
Program.sync();

EmployeeProgram.beforeCreate(ep => {
	var errors = ep.validate();
	if (errors) {
		throw new Error(errors);
	}
});

Program.beforeCreate(program => {
	var errors = program.validate();
	if (errors) {
		throw new Error(errors);
	}
});

exports.createProgram = async (req, res) => {
	const body = req.body;
	
	Program.create(body)
	.then(program => {
		var plain = program.get({plain:true});
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, program: plain });
	})
	.catch(Sequelize.ValidationError, err => {
		return res.status(400).json(err);
	})
	.catch(err => {
		return res.status(500).json(err);
	});
};

exports.addEmployeeToProgram = async (req, res) => {
	const body = req.body;
	const employeeid = body.employeeid;
	const programid = body.programid;
	if (!employeeid || !programid) {
		return res.status(404).json({ msg: "EmployeeId or programId is empty." });
	}

	EmployeeProgram.findOne({ where: {
		programid: programid,
		employeeid: employeeid
	}})
	.then(function(ep) {
		if(ep) { // update
			return ep.update(body);
		}
		else { // insert
			return EmployeeProgram.create(body);
		}
	})
	.then(ep => {
		var plain = ep.get({plain:true});
		const token = 'PLACEHOLDER';
		return res.status(201).json({ token, employeeprogram: plain });
	})
	.catch(Sequelize.ValidationError, err => {
		return res.status(400).json(err);
	})
	.catch(err => {
		return res.status(500).json(err);
	});
};

exports.getAllPrograms = async (req, res) => {
	Program.findAll({
		raw: true
	})
	.then(programs => {
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, programs: programs });
	})
	.catch(err => {
		return res.status(500).json({ msg: err });
	});
};