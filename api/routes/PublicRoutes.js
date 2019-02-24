import express from 'express';
var router = express.Router();

import EmployeeController from '../controllers/EmployeeController';

router.route('/register')
    .post(EmployeeController.register)

router.route('/login')
    .post(EmployeeController.login)

module.exports = router;
