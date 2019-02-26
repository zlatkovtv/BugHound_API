const Sequelize = require('sequelize');

const Bug = require('../models/Bug');
const Employee = require('../models/Employee');
const Program = require('../models/Program');

Employee.sync();
Bug.sync();
Program.sync();

exports.getBugsPerProgram = async (req, res) => {
	var userId = req.params.userId;
	if(!userId) {
		return res.status(404).json({msg: "No userId found in request."})
	}
	Program.belongsTo(Bug, { foreignKey: 'id'});
	Bug.hasMany(Program, { foreignKey: 'id' });
	Bug.findAll({
		where: {
			assignedto: userId
		},
		raw: true,
		group: ['programid'],
		include: [{
			model: Program,
			attributes: [],
			include: []
		}],
		attributes: ['Programs.name', [
			Sequelize.fn('COUNT', 'Program.id'), 
			'bugscount']
		]
	})
	.then(bugs => {
		const token = 'PLACEHOLDER'
		return res.status(200).json({ token, bugs: bugs });
	})
	.catch(Sequelize.ValidationError, err => {
		return res.status(400).json({msg: err.message});
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

exports.getBugsPerPriority = async (req, res) => {
	var userId = req.params.userId;
	if(!userId) {
		return res.status(404).json({msg: "No userId found in request."})
	}
	Bug.findAll({
		where: {
			assignedto: userId
		},
		raw: true,
		group: ['priority'],
		attributes: ['priority', [
			Sequelize.fn('COUNT', 'priority'), 
			'bugscount']
		]
	})
	.then(bugs => {
		const token = 'PLACEHOLDER'
		return res.status(200).json({ token, bugs: bugs });
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

exports.getBugsPerSeverity = async (req, res) => {
	var userId = req.params.userId;
	if(!userId) {
		return res.status(404).json({msg: "No userId found in request."})
	}
	Bug.findAll({
		where: {
			assignedto: userId
		},
		raw: true,
		group: ['severity'],
		attributes: ['severity', [
			Sequelize.fn('COUNT', 'severity'), 
			'bugscount']
		]
	})
	.then(bugs => {
		const token = 'PLACEHOLDER'
		return res.status(200).json({ token, bugs: bugs });
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

exports.getUnassignedBugs = async (req, res) => {
	Bug.findAll({
		where: {
			assignedto: null
		},
		raw: true
	})
	.then(bugs => {
		const token = 'PLACEHOLDER'
		return res.status(200).json({ token, bugs: bugs });
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};