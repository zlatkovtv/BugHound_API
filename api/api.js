/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');
const fileUpload = require('express-fileupload');

/**
 * server configuration
 */
const config = require('../config/Configuration');
const dbService = require('./services/DBService');
const auth = require('./policies/AuthPolicy');
import AuthRoutes from './routes/PublicRoutes';
import Routes from './routes/Routes';

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ 
  extended: true,
  limit: "50mb",
  parameterLimit: 50000
 }));
app.use(bodyParser.json({
  limit: "50mb"
}));

app.use(fileUpload());

// secure your private routes with jwt authentication middleware
//app.all('/api/*', (req, res, next) => auth(req, res, next));

// fill routes for express application
app.use('/authenticate/', AuthRoutes);
app.use('/api/', Routes);

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
