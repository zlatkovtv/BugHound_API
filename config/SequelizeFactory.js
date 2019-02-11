const Sequelize = require('sequelize');
const path = require('path');

const connectionStrings = require('./ConnectionStrings');

let db;

switch (process.env.NODE_ENV) {
  case 'production':
    db = new Sequelize(
      connectionStrings.production.database,
      connectionStrings.production.username,
      connectionStrings.production.password, {
        host: connectionStrings.production.host,
        dialect: connectionStrings.production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  case 'testing':
    db = new Sequelize(
      connectionStrings.testing.database,
      connectionStrings.testing.username,
      connectionStrings.testing.password, {
        host: connectionStrings.testing.host,
        dialect: connectionStrings.testing.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  default:
    db = new Sequelize(
      connectionStrings.development.database,
      connectionStrings.development.username,
      connectionStrings.development.password, {
        host: connectionStrings.development.host,
        dialect: connectionStrings.development.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
}

module.exports = db;
