import express from 'express';
var router = express.Router();

import EmployeeController from '../controllers/EmployeeController';
import ProgramController from '../controllers/ProgramController';
import AreaController from '../controllers/AreaController';
import BugController from '../controllers/BugController';
import AttachmentController from '../controllers/AttachmentController';

router.route('/employee/all/:programId?')
  .get(EmployeeController.getAll);

router.route('/employee')
  .put(EmployeeController.updateEmployee);

router.route('/employee/:id')
  .get(EmployeeController.getEmployee)
  .delete(EmployeeController.deleteEmployee);

// Program and EmployeeProgram
router.route('/program/all')
  .get(ProgramController.getAllPrograms);

router.route('/program')
  .post(ProgramController.createProgram)
  .put(ProgramController.updateProgram);

router.route('/program/:name')
  .delete(ProgramController.deleteProgram);

router.route('/employeeprogram')
  .post(ProgramController.addEmployeeToProgram)
  .get(ProgramController.getAllEmployeeProgram);
// Area
router.route('/area/all')
  .get(AreaController.getAllAreas);

router.route('/area')
  .post(AreaController.createArea);

router.route('/area/:name')
  .delete(AreaController.deleteArea);

// Bug
router.route('/bug/all/:programId?')
  .get(BugController.getBugs);

router.route('/bug')
  .post(BugController.createBug)
  .put(BugController.updateBug);

router.route('/bug/:id')
  .delete(BugController.deleteBug);

// Attachment
router.route('/bug/:id/attachments')
  .get(AttachmentController.getAttachments)
  .post(AttachmentController.saveAttachment);

router.route('/bug/:id/attachments/:attachmentId')
  .delete(AttachmentController.deleteAttachment);

module.exports = router;