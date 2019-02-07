import express from 'express';
var router = express.Router();

import EmployeeController from '../controllers/EmployeeController';
// import EmployeeProgramController from '../controllers/EmployeeProgramController';
// import ProgramController from '../controllers/ProgramController';
// import BugsController from '../controllers/BugsController';
// import AreasController from '../controllers/AreasController';
// import AttachmentsController from '../controllers/AttachmentsController';

// employees
router.route('/employees')
	.get(EmployeeController.getAll)
	.post(EmployeeController.createEmployee);

router.route('/employee/:id')
	.get(EmployeeController.getEmployee)
	.post(EmployeeController.register)
	.put(EmployeeController.updateEmployee)
	.delete(EmployeeController.deleteEmployee);

// 	// employee-programs
// router.route('/eps')
// 	.get(Em.getAll)
// 	.post(EmployeeController.createEmployee);

// router.route('/ep/:id')
// 	.get(EmployeeController.getEmployee)
// 	.post(EmployeeController.register)
// 	.put(EmployeeController.updateEmployee)
// 	.delete(EmployeeController.deleteEmployee);

// 	// programs
// router.route('/programs')
// 	.get(EmployeeController.getAll)
// 	.post(EmployeeController.createEmployee);

// router.route('/program/:id')
// 	.get(EmployeeController.getEmployee)
// 	.post(EmployeeController.register)
// 	.put(EmployeeController.updateEmployee)
// 	.delete(EmployeeController.deleteEmployee);

// 	// areas
// router.route('/areas')
// 	.get(EmployeeController.getAll)
// 	.post(EmployeeController.createEmployee);

// router.route('/area/:id')
// 	.get(EmployeeController.getEmployee)
// 	.post(EmployeeController.register)
// 	.put(EmployeeController.updateEmployee)
// 	.delete(EmployeeController.deleteEmployee);

// 	// bugs
// router.route('/bugs')
// 	.get(EmployeeController.getEmployee)
// 	.post(EmployeeController.register)
// 	.put(EmployeeController.updateEmployee)
// 	.delete(EmployeeController.deleteEmployee);

// router.route('/bug/:id')
// 	.get(EmployeeController.getEmployee)
// 	.post(EmployeeController.register)
// 	.put(EmployeeController.updateEmployee)
// 	.delete(EmployeeController.deleteEmployee);

// 		// attachments
// router.route('/attachments')
// 	.get(EmployeeController.getEmployee)
// 	.post(EmployeeController.register)
// 	.put(EmployeeController.updateEmployee)
// 	.delete(EmployeeController.deleteEmployee);

// router.route('/attachment/:id')
// 	.get(EmployeeController.getEmployee)
// 	.post(EmployeeController.register)
// 	.put(EmployeeController.updateEmployee)
// 	.delete(EmployeeController.deleteEmployee);

module.exports = router;
