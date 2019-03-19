const Sequelize = require('sequelize');
const Area = require('../models/Area');

Area.sync();

// TESTED
exports.getAllAreas = async (req, res) => {
	Area.findAll({
		raw: true
	})
	.then(areas => {
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, areas: areas });
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

exports.getArea = async (req, res) => {
	var programId = req.params.programId;
	var condition = {};
	if (programId) {
		condition["programid"] = programId;
	}

	Area.findAll({
		where: condition,
		raw: true
	})
	.then(areas => {
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, areas: areas });
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};


// TESTED
exports.createArea = async (req, res) => {
	const body = req.body;
	
	Area.create(body)
	.then(area => {
		var plain = area.get({plain:true});
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, area: plain });
	})
	.catch(Sequelize.ValidationError, err => {
		return res.status(400).json({msg: err.message});
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};

// TESTED
exports.deleteArea = async (req, res) => {
	const name = req.params.name;
	if (!name) {
		return res.status(400).json({ msg: "Area name is missing." });
	}
	
	Area.destroy({
		where: {
			name: name
		}
	})
	.then(() => {
		const token = 'PLACEHOLDER';
		return res.status(200).json({ token, msg: "Area deleted successfully." });
	})
	.catch(err => {
		return res.status(500).json({msg: err.message});
	});
};