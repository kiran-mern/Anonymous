const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const UserPost= require('./UserPost')
const User=require('./Users')


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

UserPost.hasMany(Comments, { foreignKey: "post_id" });
Comments.belongsTo(UserPost, { foreignKey: "post_id" });
User.hasMany(Comments, { foreignKey: "user_id" });
Comments.belongsTo(User, { foreignKey: "user_id" });

(async()=>{
    try{
        await Comments.sync({alter:true});
        console.log("comments table updated");

    }catch(err){
        console.log('error while syncing comments',err);

    } 
})();
module.exports=Comments ;