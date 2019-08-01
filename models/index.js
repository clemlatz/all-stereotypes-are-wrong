'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};

const databaseUrl = process.env.DB;
if (typeof databaseUrl === 'undefined') {
  process.stderr.write('DB env variable should be defined.\n');
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {
    process.stdout.write(
      `MySQL has successfully connected to ${sequelize.config['database']} on ${
        sequelize.config['host']
      }.\n`
    );
  })
  .catch(err => {
    process.stderr.write(
      `MySQL failed to connect to ${sequelize.config['database']} on ${
        sequelize.config['host']
      }:\n${err}\n`
    );
    process.exit(1);
  });

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
