const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const UnverifiedUser = sequelize.define('UnverifiedUser', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        // defaultValue: Sequelize.NOW
    }
});
(async () => {
    try {
      await UnverifiedUser.sync({ alter: true });
      console.log('UnverifiedUser table updated!');
    } catch (error) {
      console.error('Error syncing verified table:', error);
    }
  })();

module.exports = UnverifiedUser;
