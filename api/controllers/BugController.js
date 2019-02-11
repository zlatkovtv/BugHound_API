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

exports.fooBar = async (req, res) => {

};
