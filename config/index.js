const privateRoutes = require('../api/routes/routes');
const publicRoutes = require('../api/routes/public.routes');

const config = {
  migrate: false,
  privateRoutes,
  publicRoutes,
  port: process.env.PORT || '2017',
};

module.exports = config;
