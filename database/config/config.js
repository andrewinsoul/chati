const dotenv = require('dotenv');

dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DIALECT,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: DB_DIALECT,
    storage: '../chati_db.sqlite',
    seederStorage: 'sequelize',
    logging: false,
    dialectOptions: {
      multipleStatements: true,
      prependSearchPath: true,
    },
  },
  test: {
    DATABASE_URL,
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions: {
      multipleStatements: true,
      prependSearchPath: true,
    },
  },
  production: {
    DATABASE_URL,
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions: {
      multipleStatements: true,
      prependSearchPath: true,
    },
  },
  staging: {
    DATABASE_URL,
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions: {
      multipleStatements: true,
      prependSearchPath: true,
    },
  },
};
