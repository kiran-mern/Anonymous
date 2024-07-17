const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Messages = sequelize.define('Messages', {
    id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'Users',
            key:'user_id'
        },
        onDelete:'CASCADE'

    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'Users',
            key:'user_id'
        },
        onDelete:'CASCADE'
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
})();
module.exports=Messages;