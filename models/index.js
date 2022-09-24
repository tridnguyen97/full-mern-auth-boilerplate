const { Sequelize } = require('sequelize')
require('dotenv').config()
const { applyExtraSetup } = require('./extraSetupSequelize')

const sequelize = new Sequelize(process.env.LOCAL_DB_NAME, process.env.LOCAL_DB_USERNAME, process.env.LOCAL_DB_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql',
  logQueryParameters: true, 
  pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});

const modelDefiners = [
  require('./user.model'),
  // Add more models here...
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

module.exports = sequelize