const Sequelize = require('sequelize');
const Bug = require('../models/Bug');

Bug.sync();
Bug.beforeCreate(bug => {
	var errors = bug.validate();
	if (errors) {
		throw new Error(errors);
	}
});

Bug.beforeUpdate(bug => {
	var errors = bug.validate();
	if (errors) {
		throw new Error(errors);
	}
});

exports.createBug = async (req, res) => {
	const body = req.body;

	Bug.create(body)
		.then(bug => {
			var plain = bug.get({ plain: true });
			const token = 'PLACEHOLDER'
			return res.status(201).json({ token, bug: plain });
		})
		.catch(Sequelize.ValidationError, err => {
			return res.status(400).json(err);
		})
		.catch(err => {
			return res.status(500).json(err);
		});
};

exports.updateBug = async (req, res) => {
	const body = req.body;

	Bug.findById(body.id)
		.then(foundBug => {
			if (foundBug) {
				foundBug.update(body)
					.then(bug => {
						var plain = bug.get({ plain: true });
						const token = 'PLACEHOLDER'
						return res.status(200).json({ token, bug: plain });
					})
					.catch(Sequelize.ValidationError, err => {
						return res.status(400).json(err);
					})
					.catch(err => {
						return res.status(500).json(err);
					});
			}

			return res.status(404).json({err: "Bug with such ID not found."});
		})
		.catch(err => {
			return res.status(500).json(err);
		});
};

exports.getBugs = async (req, res) => {
	var programId = req.params.programId;
	var condition = {};
	if (programId) {
		condition["programid"] = programId;
	}

	Bug.findAll({
		where: condition,
		raw: true
	})
	.then(bugs => {
		const token = "placeholder";
		//authService().issue({ id: employee.id });
		return res.status(200).json({ token, bugs: bugs });
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({ msg: err });
	});
};

exports.deleteBug = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		return res.status(404).json({ msg: "Bug not found or ID is missing." });
	}

	Bug.destroy({
		where: {
			id: id
		}
	})
	.then(() => {
		const token = 'PLACEHOLDER';
		return res.status(200).json({ token, msg: "Bug deleted successfully." });
	})
	.catch(err => {
		return res.status(500).json(err);
	});
};