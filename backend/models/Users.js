const { DataTypes } = require("sequelize");
const { sequelize }= require("../config/database");

sequelize.options.logging = false;

const Users = sequelize.define("Users", {
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    image: {
        type: DataTypes.STRING,
    },
    
});

// Sync the model with the database
(async () => {
    try {
      await Users.sync({ alter: true });
      console.log('User table updated!');
    } catch (error) {
      console.error('Error syncing user table:', error);
    }
  })();
  
  module.exports = Users;
