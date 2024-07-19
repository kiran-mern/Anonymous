const { DataTypes } = require("sequelize");
const { sequelize }= require("../config/database");
// const Connection = require("./Connection");
// const Connection = require('./Connection');


sequelize.options.logging = false;

const Users = sequelize.define("Users", {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

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
    role:{
        type:DataTypes.STRING,
        defaultValue:'user',

    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    image: {
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.STRING,
        defaultValue: 'Happy'
    }
    
});


// Define associations

// Users.hasMany(Connection, { foreignKey: 'sender_id', as: 'SentConnections' });
// Users.hasMany(Connection, { foreignKey: 'receiver_id', as: 'ReceivedConnections' });

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
