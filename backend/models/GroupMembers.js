const {DataTypes}= require  ('sequelize')
const {sequelize} = require('../config/database')
// const Users= require('../models/Users')
// const Groups= require('../models/Group')

const GroupMember=sequelize.define("GroupMembers",{
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Groups',
            key: 'group_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    }
}, {
    timestamps: false
});

(async () => {
    try {
        await GroupMember.sync({ alter: true });
        console.log('GroupMember table updated!');
    } catch (error) {
        console.error('Error syncing GroupMember table:', error);
    }
})();

module.exports = GroupMember;