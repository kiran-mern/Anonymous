const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Messages = sequelize.define('Messages', {
    id: {
        id: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    }
   
}, {timestamps:true}

);

(async()=>{
    try{
        await Messages.sync({alter:true})
        console.log('Message table updated');


    }catch(err){
        console.log('error on updating message table');

    }
})