const Users = require('../models/Users');
const Connection = require('../models/Connection');
const Group= require('../models/Group')
const GroupMember= require('../models/GroupMembers')

// Define associations
Users.hasMany(Connection, { foreignKey: 'sender_id', as: 'SentConnections' });
Users.hasMany(Connection, { foreignKey: 'receiver_id', as: 'ReceivedConnections' });

Connection.belongsTo(Users, { as: 'Sender', foreignKey: 'sender_id' });
Connection.belongsTo(Users, { as: 'Receiver', foreignKey: 'receiver_id' });

GroupMember.belongsTo(Group, { foreignKey: 'group_id' });
Group.hasMany(GroupMember, { foreignKey: 'group_id' });

GroupMember.belongsTo(Users,{foreignKey:'user_id'});
Users.hasMany(GroupMember,{foreignKey:'user_id'});

Group.belongsTo(Users, { foreignKey: 'admin', as: 'adminUser' });


// Sync the models with the database
(async () => {
    try {
        await Users.sync({ alter: true });
        await Connection.sync({ alter: true });
        await Group.sync({alter:true});
        await GroupMember.sync({alter:true});

        console.log('Tables updated!');
    } catch (error) {
        console.error('Error syncing tables:', error);
    }
})();