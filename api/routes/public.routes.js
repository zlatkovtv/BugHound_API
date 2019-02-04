import express from 'express';
var router = express.Router();
import AuthController from '../controllers/AuthController'

router.route('/register')
  .post(AuthController.register);

router.route('/login')
  .post(AuthController.login);

module.exports = router;
