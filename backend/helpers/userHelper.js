const User = require('../models/Users')
const { Op } = require('sequelize')
const Group = require('../models/Group');
const GroupMember = require('../models/GroupMembers');
const UserPost = require('../models/UserPost')
const LikePosts = require('../models/Likes')
const Comments = require('../models/Comments')
const Message = require('../models/Messages');
const Connection = require('../models/Connection')
const { sequelize } = require('../config/database');
module.exports = {

    setStatus: async (data, newStatus) => {
        try {
            const user = await User.findOne({ where: { email: data } })
            console.log(user, '44');
            const updated = await User.update(
                { status: newStatus },
                { where: { user_id: user.user_id } }
            )
            console.log(updated, 'ss');
            if (updated) {
                console.log('user status updated successfully');
                return updated
            } else {
                console.log('failed to update');
            }

        } catch (err) {

            console.log('error when updating the status', err);
        }
    },
    gCreation: async (data, img, id) => {
        const create = await Group.create({
            groupName: data, image: img, user_id: id
        })
        console.log('created');
        return create
    },
    findUser: async (data) => {
        const user = await User.findOne({ where: { email: data } })
        return user
    },
    isActive: async (data) => {
        try {
            const change = await User.update({ isActive: false }, { where: { email: data } })
            return change

        }
        catch (err) {
            console.error('Error while deactivating', err)
            throw err

        }

    },
    findGroup: async (gId, uId) => {
        const find = await Group.findOne({ where: { group_id: gId, user_id: uId } });
        // console.log(find,'ssssssss');
        return find;

    },
    addMembers: async (gId, uId) => {
        const create = await GroupMember.create({ group_id: gId, user_id: uId })
        return create;

    },
    viewAll: async () => {
        const view = await UserPost.findAll({})
        // console.log(view,'view')
        return view;
    },
    findLike: async (pId, uId) => {
        const find = await LikePosts.findOne({ where: { post_id: pId, user_id: uId } })
        console.log('find', find);
        return find;

    },
    dLike: async (pId, uId) => {
        const remove = await LikePosts.destroy({ where: { post_id: pId, user_id: uId } })
        console.log('dLike', this.dLike);
        return remove;

    },
    like: async (pId, uId) => {
        const like = await LikePosts.create({ where: { post_id: pId, user_id: uId } })
        console.log(like, "like");
        return like;
    },
    findLike: async (pId, uId) => {
        const find = await LikePosts.findOne({ where: { post_id: pId, user_id: uId } })
        console.log('find', find);
        return find;

    },
    dLike: async (pId, uId) => {
        const remove = await LikePosts.destroy({ where: { post_id: pId, user_id: uId } })
        console.log('dLike', remove);
        return remove;

    },
    like: async (pId, uId) => {
        await LikePosts.create({ post_id: pId, user_id: uId })
        const post = await UserPost.findOne({ where: { post_id: pId } })
        post.likeCount += 1

        console.log(post.likeCount, "like");
        return post.likeCount;
    },
    countLikes: async (pId) => {
        const count = await LikePosts.count({ where: { post_id: pId } })
        console.log(count, 'count');
        return count;
    },
    addComment: async (pId, uId, data) => {
        const result = await Comments.create({ post_id: pId, user_id: uId, content: data })
        console.log(result, 'cmmnt result');
        return result;
    },
    getComments: async (data) => {
        const result = await Comments.findAll({
            where: { post_id: data },
            order: [['createdAt', 'DESC']]
        })
        console.log(result, 'reasss');
        return result;
    },
    createRoom: async (sId, rId, data) => {
        const result = await Message.create({
            sender_id: sId,
            receiver_id: rId,
            content: data
        })
        console.log(result, 'msg stored success in uH');
        return result;
    },
    allMessage: async (id) => {
        const data = await Message.findAll({
            attributes: ['sender_id', 'receiver_id', 'content', 'timestamps'],
            where: { sender_id: id }
        })
        console.log(data, 'all stored messages ');
        return data;
    },
     userFind: async (data, mail,userId) => {
        const result = await User.findAll({
            where: {
                status: data,
                email: {
                    [Op.ne]: mail

            },
            [Op.and]:[
                sequelize.literal(`user_id NOT IN (SELECT receiver_id FROM connections WHERE sender_id = ${userId} AND status = 'pending')`)          
              ]
            }
        });
        console.log(result, 'allUser');
        return result;
    },
    findId: async (data) => {
        const result = await User.findOne({ where: { user_id: data } })
        console.log(result, 'result by receiver id ');
        return result
    },
    findRequest: async (sId, rId) => {
        try {
            const request = await Connection.findOne({
                where:
                { 
                    // status:'pending',
                   [ Op.or]:[
                    { sender_id: sId,receiver_id: rId},
                    { sender_id: rId,receiver_id: sId}
                   ]
                    

                }
            })

            return request;

        } catch (err) {
            console.log(err, 'error on finding existing request');
        }
    },
    makeConnection: async (sId, rId) => {
        const connection = await Connection.create({
            sender_id: sId, receiver_id: rId, status: 'pending'
        })
        console.log(connection, 'makeconnctn');
        return connection
    },
    existConnection: async (sId, rId) => {
        const connect = await Connection.findOne({
            where: {
                sender_id: sId, receiver_id: rId, status: 'pending',notificationStatus: 'unread'
            }
        })
        return connect
    },
    accept: async (sId, rId) => {
        try{
            const update = await Connection.update(
                { status: 'accepted',notificationStatus: 'read' },
                { where: { sender_id: sId, receiver_id: rId, status: 'pending' } }
            )
            return update
        }
        catch(err){
            console.log(err,'error on updating the status ');
        
        }
    },
    unwantedUser:async(sId,rId)=>{
        try{
            const update = await Connection.update(
                { status: 'rejected',notificationStatus: 'read' },
                { where: { sender_id: sId, receiver_id: rId, status: 'pending' } }
            )
            return update
        }
        catch(err){
            console.log(err,'error on updating the status ');
        
        }

    },
    connectedOne:async(id)=>{
        try{
            const result= await Connection.findAll({
                where:{
                    status:'accepted',
                    [Op.or]:[
                        {sender_id:id},
                        {receiver_id:id}
                    ]

            },
            include:[{
                model:User,
                as:'Sender',
                attributes:['name','user_id'], 
            },{
                model:User,
                as:'Receiver',
                attributes: ['name', 'user_id'],
            }]
        })
            return result.map((connection)=>({
                id:connection.id,
                profileName: connection.sender_id === id ? connection.Receiver.name : connection.Sender.name,
                userId: connection.sender_id === id ? connection.Receiver.user_id : connection.Sender.user_id,

            }))

        }
        catch(err){
            console.log(err,'error fetching connected users');

        }  
    },
  
    requestedOne:async(id)=>{
        try{
            const result= await Connection.findAll({where:{
                sender_id:id,status:'pending'},
                include: [{
                    model: User,
                    as: 'Receiver',
                    attributes: ['name', 'user_id']
                }]
            })
            return result.map((connection)=>({
                id:connection.id,
                profileName:connection.Receiver.name,
                userId:connection.Receiver.user_id

            }))
        }
        catch(err){
            console.log(err,'error fetching requsted users')
        }
    }




}