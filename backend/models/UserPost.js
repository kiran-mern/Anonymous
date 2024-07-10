const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const UserPost = sequelize.define("UserPost", {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,

    },
    user_id:{
       type: DataTypes.INTEGER,
       allowNull:false,
       references:{
        model: 'Users',
        key: 'user_id'
       }
      
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
   },
   countLike:{
    type: DataTypes.INTEGER,
    defaultValue: 0

}

   
  
   

});

// Sync the model with the database
(async () => {
    try {
      await UserPost.sync({ alter: true });
      console.log('post creation table updated!');
    } catch (error) {
      console.error('Error syncing post creation table:', error);
    }
  })();
  
  module.exports = UserPost;
