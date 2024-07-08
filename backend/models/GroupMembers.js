const {DataTypes}= require  ('sequelize')
const {sequalize} = require('../config/database')

const GroupMember=sequalize.define("GroupMembers",{
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