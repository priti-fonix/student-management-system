const { Sequelize } = require("sequelize");
require("dotenv").config();

// Using PostgreSQL with environment variables
const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false, // Set to console.log to see SQL queries
});

async function connectdb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// console.log("All models were synchronized successfully.");

module.exports = { connectdb, sequelize };
// Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });
