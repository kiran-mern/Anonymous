// const {DataTypes, DATE}= require('sequelize')
// const {sequelize}= require('../config/database')

// const GroupMessage=sequelize.define('GroupMessages',{

//     id:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         unique:true,
//         autoIncrement:true
//     },
//     group_id:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//         references:{
//             model: 'Groups',
//             key: 'group_id'
//         }
//     },
//     sender_id:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Users',
//             key: 'user_id'
//         }

//     },
//     content:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     createdAt:{
//         type:DataTypes.DATE,
//         defaultValue:DataTypes.NOW(),
//         allowNull:false
//     }
// },{timestamps:true}
// );
// (async ()=>{
//     try{
//         await GroupMessage.sync({alter:true})
//         console.log('GroupMessage table updated');
//     }
//     catch(err){
//         console.log(err,'error syncing storing groupMessages');
//     }
// })
// module.exports=GroupMessage;