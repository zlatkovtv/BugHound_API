const Attachment = require("../models/Attachment");

Attachment.sync();
// Attachment.beforeCreate(attachment => {
// 	var errors = attachment.validate();
// 	if (errors) {
// 		throw new Error(errors);
// 	}
// });

// Attachment.beforeUpdate(attachment => {
// 	var errors = attachment.validate();
// 	if (errors) {
// 		throw new Error(errors);
// 	}
// });

exports.getAttachments = async (req, res) => {
	var bugId = req.params.id;
	var condition = {};
	if (bugId) {
		condition["bugid"] = bugId;
	}

	Attachment.findAll({
		where: condition,
		raw: true
	})
	.then(attachments => {
		const token = "placeholder";
		//authService().issue({ id: employee.id });
		return res.status(200).json({ token, bugs: attachments });
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({msg: err.message});
	});
};

exports.saveAttachment = async (req, res) => {

};

exports.deleteAttachment = async (req, res) => {

};
