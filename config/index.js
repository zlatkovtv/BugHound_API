const privateRoutes = require('../api/routes/Routes');
const publicRoutes = require('../api/routes/PublicRoutes');

const config = {
  migrate: false,
  privateRoutes,
  publicRoutes,
  port: process.env.PORT || '2017',
};

module.exports = config;
