const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const UserPost = sequelize.define("UserPost", {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    user_id:{
       type: DataTypes.INTEGER,
       allowNull:false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
   }
    // email: {
    //     type: DataTypes.STRING,
    //     allowNull: false

    // },
   
  
   

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
