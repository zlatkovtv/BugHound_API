const Attachment = require("../models/Attachment");
const Sequelize = require('sequelize');
const multer = require('multer')

Attachment.sync();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../assets/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

var upload = multer({
	storage: storage
})
.single('attachment');

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
			return res.status(500).json({ msg: err.message });
		});
};

exports.saveAttachment = async (req, res) => {
	var bugId = req.params.id;

	upload(req, res, function (err) {
		if(!req.file) {
			return res.status(400).json({ msg: "No file found in request." });
		}

		const filePath = `${req.file.destination}/${req.file.filename}`
		Attachment.create({
			filename: filePath,
			datesubmitted: new Date(),
			bugid: bugId
		})
		.then(area => {
			var plain = area.get({ plain: true });
			const token = 'PLACEHOLDER'
			return res.status(201).json({ token, area: plain });
		})
		.catch(Sequelize.ValidationError, err => {
			return res.status(400).json({ msg: err.message });
		})
		.catch(err => {
			return res.status(500).json({ msg: err.message });
		});
		res.end('File is uploaded')
	})
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
		return res.status(500).json({msg: err.message});
	});
};
