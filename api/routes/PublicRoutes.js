import express from 'express';
var router = express.Router();

import EmployeeController from '../controllers/EmployeeController';
import ProgramController from '../controllers/ProgramController';
import AreaController from '../controllers/AreaController';

router.route('employee/all/:programId?')
.get(EmployeeController.getAll);

router.route('/employee')
  //.get(EmployeeController.login)
  .post(EmployeeController.register)
  .put(EmployeeController.updateEmployee);

router.route('/employee/:id')
	.get(EmployeeController.getEmployee)
  .delete(EmployeeController.deleteEmployee);
  
// Program and EmployeeProgram
router.route('/program/all')
  .get(ProgramController.getAllPrograms);

router.route('/program')
  .post(ProgramController.createProgram);

router.route('/employeeprogram')
  .post(ProgramController.addEmployeeToProgram);

// Area
router.route('/area/all')
  .get(AreaController.getAllAreas);

router.route('/area')
  .post(AreaController.createArea);

router.route('/area/:name')
  .delete(AreaController.deleteArea);

module.exports = router;
