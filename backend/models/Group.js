const {DataTypes, DATE}= require('sequelize')
const {sequelize} = require('../config/database')

const Group=sequelize.define("Group",{
    group_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    }
});

(async () => {
    try {
      await Group.sync({ alter: true });
      console.log('Group table updated!');
    } catch (error) {
      console.error('Error syncing Group table:', error);
    }
  })();

  module.exports= Group ;

  