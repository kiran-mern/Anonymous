const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const app = express();
const server = http.createServer(app)
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
require('dotenv').config();
require('./config/association')
const routerMiddleware = require('./middlewares/routes');
const { timeStamp, log } = require('console');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routerMiddleware())



const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

const onlineUsers = new Map();
io.on('connection', (socket) => {
 console.log('new user connected', socket.id);


    socket.on('userJoin', (userId) => {
        onlineUsers.set(userId, socket.id)
        io.emit('userStatus', { userId, status: 'online' });

    })

    socket.on('personal',({to,message,groupId})=>{
        const receiver=onlineUsers.get(to);
        if(receiver){
            io.to(receiver).emit('newMessage',{
                from:socket.id,
                groupId,
                message,
                timeStamp:new Date().toISOString()
            })
        }
    })

    socket.on('group',(groupId)=>{
        socket.join(groupId)
    })

    socket.on('typing',({to,isTyping})=>{
        const receiver=onlineUsers.get(to);
        if(receiver){
            io.to(receiver).emit('typingStatus',{from:socket.id,isTyping})
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        for (const [userId, userSocket] of onlineUsers.entries()) {
          if (userSocket=== socket) {
            onlineUsers.delete(userId);
            io.emit('userStatus', { userId, status: 'offline' });
            break;
          }
        }
    });
    
})
server.listen(3000, () => {
    console.log('server is running');
})



module.exports = app;