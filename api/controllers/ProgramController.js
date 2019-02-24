const Sequelize = require('sequelize');

const EmployeeProgram = require('../models/EmployeeProgram');
const Program = require('../models/Program');

EmployeeProgram.sync();
Program.sync();

// TESTED
exports.createProgram = async (req, res) => {
	const body = req.body;
	
	Program.create(body)
	.then(program => {
		var plain = program.get({plain:true});
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, program: plain });
	})
	.catch(Sequelize.ValidationError, err => {
		return res.status(400).json({msg: err.message});
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

// TESTED
exports.updateProgram = async (req, res) => {
	const body = req.body;

	Program.findById(body.id)
		.then(foundProgram => {
			if (!foundProgram) {
				return res.status(404).json({err: "Program with such name not found."});
			}

			foundProgram.update(body)
				.then(program => {
					var plain = program.get({ plain: true });
					const token = 'PLACEHOLDER'
					return res.status(200).json({ token, program: plain });
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
exports.deleteProgram = async (req, res) => {
	const name = req.params.name;
	if (!name) {
		return res.status(404).json({ msg: "Program not found or ID is missing." });
	}

	Program.destroy({
		where: {
			name: name
		}
	})
	.then(program => {
		const token = 'PLACEHOLDER';
		return res.status(200).json({ msg: "Program deleted successfully." });
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({msg: err.message});
	});
};

// TESTED
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
		return res.status(400).json({msg: err.message});
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

// TESTED
exports.getAllPrograms = async (req, res) => {
	Program.findAll({
		raw: true
	})
	.then(programs => {
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, programs: programs });
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

exports.getAllEmployeeProgram = async (req,res) => {
	EmployeeProgram.findAll({
		raw:true
	})
	.then(programs=>{
		const token = 'PLACEHOLDER'
		return res.status(201).json({token, programs:programs});
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
}