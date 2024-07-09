const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Comments= sequelize.define('Comments',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true,

    },
    post_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: 'UserPosts',
            key: 'post_id'
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Users',
            key:'user_id'
        }
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false,

    }

});

(async()=>{
    try{
        await Comments.sync({alter:true});
        console.log("comments table updated");

    }catch(err){
        console.log('error while syncing comments',err);

    } 
})();
module.exports=Comments ;