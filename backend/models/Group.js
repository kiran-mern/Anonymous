const {DataTypes, DATE}= require('sequelize')
const {sequelize} = require('../config/database')
const User= require('../models/Users')

const Group=sequelize.define("Group",{
    group_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true

    },
    groupName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
        allowNull:false
    },
    admin:{
        type:DataTypes.INTEGER,
        // allowNull:false,
        references:{
            model:'Users',
            key: 'user_id'

            
        }
    }
});

(async () => {
    try {
        await User.sync({ alter: true }); 
      await Group.sync({ alter: true });
      console.log('Group table updated!');
    } catch (error) {
      console.error('Error syncing Group table:', error);
    }
  })();

  module.exports= Group ;

  