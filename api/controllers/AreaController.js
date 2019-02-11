const Area = require('../models/Area');

Area.sync();
Area.beforeCreate(area => {
	var errors = area.validate();
	if (errors) {
		throw new Error(errors);
	}
});

Area.beforeUpdate(area => {
	var errors = area.validate();
	if (errors) {
		throw new Error(errors);
	}
});

exports.getAllAreas = async (req, res) => {
	Area.findAll({
		raw: true
	})
	.then(areas => {
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, areas: areas });
	})
	.catch(err => {
		return res.status(500).json({ msg: err });
	});
};

exports.createArea = async (req, res) => {
	const body = req.body;
	
	Area.create(body)
	.then(area => {
		var plain = area.get({plain:true});
		const token = 'PLACEHOLDER'
		return res.status(201).json({ token, area: plain });
	})
	.catch(Sequelize.ValidationError, err => {
		return res.status(400).json(err);
	})
	.catch(err => {
		return res.status(500).json(err);
	});
};

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
	.then(area => {
		const token = 'PLACEHOLDER';
		return res.status(200).json({ msg: "Area deleted successfully." });
	})
	.catch(err => {
		return res.status(500).json({ msg: err });
	});
};