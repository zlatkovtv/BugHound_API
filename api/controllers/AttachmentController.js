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

exports.getAttachments = async (req, res) => {

};

exports.saveAttachment = async (req, res) => {

};

exports.deleteAttachment = async (req, res) => {

};
