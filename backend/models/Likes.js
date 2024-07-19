const { DataTypes } = require ("sequelize");
const { sequelize } = require ("../config/database");
const UserPost=require('../models/UserPost')
const User= require('../models/Users')

const Like= sequelize.define("Like",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true,
    },
    post_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        // unique:true,
        references:{
            model:'UserPosts',
            key:'post_id'
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
   
});
Like.belongsTo(User, { foreignKey: 'user_id' });
Like.belongsTo(UserPost, { foreignKey: 'post_id' });

(async()=>{
    try{
        await Like.sync({alter:true});
        console.log('Likes table updated');
    }catch(err){
        console.log(err,'Error syncing post likes');

    }

})();
module.exports= Like;