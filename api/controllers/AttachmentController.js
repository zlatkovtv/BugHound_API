const Attachment = require("../models/Attachment");
const Sequelize = require('sequelize');

Attachment.sync();

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
			return res.status(200).json({ token, attachments: attachments });
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		});
};

function saveFiles(fileArray, bugId) {
	return new Promise(function(resolve, reject) {
		var path = './uploads/';
		var filesToSave = [];
		for (var i = 0; i < fileArray.length; i++) {
			var file = fileArray[i];
			file.mv('./uploads/' + file.name);		
			filesToSave.push({
				filename: path + file.name,
				datesubmitted: new Date(),
				bugid: bugId
			});
		}

		resolve(filesToSave);
	});
}

exports.saveAttachment = (req, res) => {
	var bugId = req.params.bugId;

	if (!req.files || !req.files.length === 0) {
		return res.status(400).json({ msg: "No files found in request." });
	}
	
	var fileArr = Object.values(req.files)
	saveFiles(fileArr, bugId)
	.then((fileArray) => {
		Attachment.bulkCreate(fileArray, {
			returning: true,
			raw: true
		})
		.then(attachments => {
			const token = 'PLACEHOLDER'
			return res.status(201).json({ token, attachments: attachments });
		})
		.catch(Sequelize.ValidationError, err => {
			return res.status(400).json({ msg: err.message });
		})
		.catch(err => {
			return res.status(500).json({ msg: err.message });
		});
	})
	.catch(err => {
		return res.status(500).send(err);
	});
	
};

exports.deleteAttachment = async (req, res) => {
	const attachmentId = req.params.attachmentId;
	if (!attachmentId) {
		return res.status(400).json({ msg: "Attachment ID is missing." });
	}

	Attachment.destroy({
		where: {
			id: attachmentId
		}
	})
		.then(() => {
			const token = 'PLACEHOLDER';
			return res.status(200).json({ token, msg: "Attachment deleted successfully." });
		})
		.catch(err => {
			return res.status(500).json({ msg: err.message });
		});
};

exports.download = async (req,res) =>{
	const name = req.params.name;
	var directory = __dirname.substring(0,__dirname.length-11);
	res.download(directory+"/assets/"+name);
}