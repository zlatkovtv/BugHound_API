import express from 'express';
var router = express.Router();

import EmployeeController from '../controllers/EmployeeController';
import ProgramController from '../controllers/ProgramController';
import AreaController from '../controllers/AreaController';
import BugController from '../controllers/BugController';
import AttachmentController from '../controllers/AttachmentController';
import DashboardController from '../controllers/DashboardController';

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
router.route('/bug/all/:assignedTo?')
  .get(BugController.getBugs);

router.route('/bug')
  .post(BugController.createBug)
  .put(BugController.updateBug);

router.route('/bug/:id')
  .delete(BugController.deleteBug);

// Attachment
router.route('/attachment/:bugId')
  .get(AttachmentController.getAttachments)
  .post(AttachmentController.saveAttachment);

router.route('/attachment/:attachmentId')
  .delete(AttachmentController.deleteAttachment);

// Dashboard data
router.route('/data/getBugsPerProgram')
  .get(DashboardController.getBugsPerProgram);

router.route('/data/getBugsPerPriority')
  .get(DashboardController.getBugsPerPriority);

router.route('/data/getBugsPerSeverity')
  .get(DashboardController.getBugsPerSeverity);


module.exports = router;