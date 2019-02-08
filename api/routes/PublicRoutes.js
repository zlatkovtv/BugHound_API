import express from 'express';
var router = express.Router();
import EmployeeController from '../controllers/EmployeeController'

// router.route('/register')
// 	.post(EmployeeController.register)

// router.route('/login')
//   .post(EmployeeController.login);

router.route('/employees')
  .get(EmployeeController.getAll);
  
router.route('/employee')
  .post(EmployeeController.register)
  .put(EmployeeController.updateEmployee);

router.route('/employee/:id')
	.get(EmployeeController.getEmployee)
	.delete(EmployeeController.deleteEmployee);

module.exports = router;
