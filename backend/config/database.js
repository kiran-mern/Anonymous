const {Sequelize}= require ('sequelize')
require('dotenv').config();
let databaseUrl = process.env.DATABASE_URL;
console.log(databaseUrl,'aa');

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true, // This will help you connect to RDS instances with SSL
//       rejectUnauthorized: false // You might want to adjust this based on your SSL certs
//     }
//   },
  logging: false, // Disable logging; default: console.log
});

module.exports = { sequelize };