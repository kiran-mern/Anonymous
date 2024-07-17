const {DataTypes}= require('sequelize')
const {sequelize}= require('../config/database')

const Connection= sequelize.define('Connection',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    sender_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Users',
            key:'user_id'
        }
    },
    receiver_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Users',
            key:'user_id'
        }
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'pending'
    }
},{timestamps:true});

(async()=>{
    try{
        await Connection.sync({alter:true});
        console.log('connection table updated');
    }
    catch(err){
        console.log(err,'error when connection table updated');
    }

})();
module.exports= Connection;