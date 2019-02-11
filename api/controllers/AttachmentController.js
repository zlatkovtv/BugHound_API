const Attachment = require('../models/Attachment');

Attachment.sync();
Attachment.beforeCreate(attachment => {
	var errors = attachment.validate();
	if (errors) {
		throw new Error(errors);
	}
});

Attachment.beforeUpdate(attachment => {
	var errors = attachment.validate();
	if (errors) {
		throw new Error(errors);
	}
});

exports.fooBar = async (req, res) => {

};
