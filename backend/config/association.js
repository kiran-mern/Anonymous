const Users = require('../models/Users');
const Connection = require('../models/Connection');

// Define associations
Users.hasMany(Connection, { foreignKey: 'sender_id', as: 'SentConnections' });
Users.hasMany(Connection, { foreignKey: 'receiver_id', as: 'ReceivedConnections' });

Connection.belongsTo(Users, { as: 'Sender', foreignKey: 'sender_id' });
Connection.belongsTo(Users, { as: 'Receiver', foreignKey: 'receiver_id' });

// Sync the models with the database
(async () => {
    try {
        await Users.sync({ alter: true });
        await Connection.sync({ alter: true });
        console.log('Tables updated!');
    } catch (error) {
        console.error('Error syncing tables:', error);
    }
})();