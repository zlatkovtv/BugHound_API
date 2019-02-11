import express from 'express';
var router = express.Router();

import EmployeeController from '../controllers/EmployeeController';
import ProgramController from '../controllers/ProgramController';

// router.route('/register')
// 	.post(EmployeeController.register)

// router.route('/login')
//   .post(EmployeeController.login);

router.route('/employees/:programId?')
  .get(EmployeeController.getAll);
  
router.route('/employee')
  .post(EmployeeController.register)
  .put(EmployeeController.updateEmployee);

router.route('/employee/:id')
	.get(EmployeeController.getEmployee)
  .delete(EmployeeController.deleteEmployee);
  
// EmployeeProgram
router.route('/program')
  .post(ProgramController.createProgram);

router.route('/employeeprogram')
  .post(ProgramController.addEmployeeToProgram)

module.exports = router;
