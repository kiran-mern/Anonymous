const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Admin = sequelize.define("Admin", {
    // admin_id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:'admin',

    },
    image:{
        type: DataTypes.STRING
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue: true
    }

});

// Sync the model with the database
(async () => {
    try {
      await Admin.sync({ alter: true });
      console.log('Admin table updated!');
    } catch (error) {
      console.error('Error syncing admin table:', error);
    }
  })();
  
  module.exports = Admin;
