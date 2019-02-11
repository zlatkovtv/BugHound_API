const EmployeeProgram = require('../models/EmployeeProgram');

exports.createProgram = async (req, res) => {
	const body = req.body;
	if (!body.name || !body.datestarted || !body.release || !body.version) {
		return res.status(400).json({ msg: "Body is in incorrect format." });
	}
	
	Program.create(body)
	.then(program => {
		var plain = program.get({plain:true});
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, program: plain });
	})
	.catch(err => {
		return res.status(500).json({ msg: err });
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
	.catch(err => {
		console.log(err);
		return res.status(500).json({ msg: err });
	});
};
