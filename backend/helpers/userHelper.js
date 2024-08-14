const User = require("../models/Users");
const { Op } = require("sequelize");
const Group = require("../models/Group");
const GroupMember = require("../models/GroupMembers");
const UserPost = require("../models/UserPost");
const LikePosts = require("../models/Likes");
const Comments = require("../models/Comments");
const Message = require("../models/Messages");
const Connection = require("../models/Connection");
const { sequelize } = require("../config/database");
const GroupMessage = require("../models/GroupMessages");
module.exports = {
    setStatus: async (data, newStatus) => {
        try {
            const user = await User.findOne({ where: { email: data } });
            console.log(user, "44");
            const updated = await User.update(
                { status: newStatus },
                { where: { user_id: user.user_id } }
            );
            console.log(updated, "ss");
            if (updated) {
                console.log("user status updated successfully");
                return updated;
            } else {
                console.log("failed to update");
            }
        } catch (err) {
            console.log("error when updating the status", err);
        }
    },
    gCreation: async (data, img, id) => {
        try {
            const create = await Group.create({
                groupName: data,
                image: img,
                admin: id,
            });
            console.log("Group created");
            return create;
        } catch (err) {
            console.log(err, "Error creating group");
            throw err;
        }
    },
    findUser: async (data) => {
        const user = await User.findOne({ where: { email: data } });
        return user;
    },
    isActive: async (data) => {
        try {
            const change = await User.update(
                { isActive: false },
                { where: { email: data } }
            );
            return change;
        } catch (err) {
            console.error("Error while deactivating", err);
            throw err;
        }
    },
    findGroup: async (gId) => {
        const find = await Group.findOne({ where: { group_id: gId } });
        console.log(find, "group found");
        return find;
    },
    addMembers: async (gId, uId) => {
        try {
            const groupMember = await GroupMember.create({
                group_id: gId,
                user_id: uId,
            });
            return groupMember;
        } catch (err) {
            console.log(err, "Error adding user to group");
            throw err;
        }
    },
    // viewAll: async () => {
    //     const view = await UserPost.findAll({});
    //     // console.log(view,'view')
    //     return view;
    // },
    // viewAll:async(uId)=>{
    //     try{
    //         const connection=await Connection.findAll({
    //             where:{
    //                 [Op.or]:[{sender_id:uId},,{receiver_id:uId}],
    //                 status:'accepted'
    //             },
    //             attributes:['sender_id','receiver_id']
    //         })
    //         const connectedUserId=connection.map(conn=>
    //         conn.sender_id===uId? conn.receiver_id:conn.sender_id
    //     )
    //     const view=await UserPost.findAll({
    //         include:[
    //             {
    //                 model:User,
    //                 // as:'user',
    //                 attributes:['user_id','name']
    //             },
    //             {
    //                 model:LikePosts,
    //                 as:'like',
    //                 attributes:[[sequelize.fn('COUNT',sequelize.col('likes.id')),'likesCount']],
    //                 // attributes:[],
    //                 seperate:true
    //             },{
    //                 model:Comments,
    //                 as:'comments',
    //                 attributes:[[sequelize.fn('COUNT',sequelize.col('comments.id')),'CommentCount']],

    //             }
    //         ],
    //         where:{
    //             [Op.or]:[
    //                 {'$User.user_id$':{[Op.in]:connectedUserId}},
    //                     sequelize.literal(`(SELECT COUNT (*) FROM likes where likes.postId=UserPost.id)>0`),
    //                     sequelize.literal(`(SELECT COUNT (*) FROM comments where comments.postId=userPost.id)>0`)
                    
    //             ]
    //         },
    //         order:[
    //             ['createdAt', 'DESC'],
    //             [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.postId = UserPost.id)'), 'DESC'],
    //             [sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.postId = UserPost.id)'), 'DESC']
    //         ],
    //         group: ['UserPost.id', 'User.user_id'],
    //     });
    //     return view;

    //     }catch(err){
    //         console.log(err,'error on home page');
    //     }
    viewAll: async (uId) => {
        try {
            const connection = await Connection.findAll({
                where: {
                    [Op.or]: [{ sender_id: uId }, { receiver_id: uId }],
                    status: 'accepted'
                },
                attributes: ['sender_id', 'receiver_id']
            });
            
            const connectedUserId = connection.map(conn =>
                conn.sender_id === uId ? conn.receiver_id : conn.sender_id
            );
            
            const view = await UserPost.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['user_id', 'name']
                    }
                ],
                attributes: [
                    'post_id',
                    'content',
                    'countLike',
                    'countComment',
                    'createdAt'
                ],
                where: {
                    [Op.or]: [
                        { '$User.user_id$': { [Op.in]: connectedUserId } },
                        { countLike: { [Op.gt]: 0 } },
                        { countComment: { [Op.gt]: 0 } }
                    ]
                },
                order: [
                    ['createdAt', 'DESC'],
                    ['countLike', 'DESC'],
                    ['countComment', 'DESC']
                ]
            });
            
            return view;
        } catch (err) {
            console.log(err, 'error on home page');
            throw err;
        }
    },
    findLike: async (pId, uId) => {
        const find = await LikePosts.findOne({
            where: { post_id: pId, user_id: uId },
        });
        console.log("find", find);
        return find;
    },
    dLike: async (pId, uId) => {
        const remove = await LikePosts.destroy({
            where: { post_id: pId, user_id: uId },
        });
        console.log("dLike", this.dLike);
        return remove;
    },
    like: async (pId, uId) => {
        const like = await LikePosts.create({
            where: { post_id: pId, user_id: uId },
        });
        console.log(like, "like");
        return like;
    },
    findLike: async (pId, uId) => {
        const find = await LikePosts.findOne({
            where: { post_id: pId, user_id: uId },
        });
        console.log("find", find);
        return find;
    },
    dLike: async (pId, uId) => {
        const remove = await LikePosts.destroy({
            where: { post_id: pId, user_id: uId },
        });
        const post = await UserPost.findOne({ where: { post_id: pId } });
        if (post.countLike > 0) {
            post.countLike -= 1;
            await post.save();
        }

        console.log("dLike", remove);
        return remove;
    },
    like: async (pId, uId) => {
        await LikePosts.create({ post_id: pId, user_id: uId });
        const post = await UserPost.findOne({ where: { post_id: pId } });
        post.countLike += 1;
        await post.save();

        console.log(post.countLike, "like");
        return post.countLike;
    },
    countLikes: async (pId) => {
        const count = await LikePosts.count({ where: { post_id: pId } });
        console.log(count, "count");
        return count;
    },
    addComment: async (pId, uId, data) => {
        const result = await Comments.create({
            post_id: pId,
            user_id: uId,
            content: data,
        });
        console.log(result, "cmmnt result");
        return result;
    },
    countComment: async (pId) => {
        const post = await UserPost.findOne({ where: { post_id: pId } })
        post.countComment += 1
        await post.save();
        return post.countComment;
    },
    getComments: async (data) => {
        const result = await Comments.findAll({
            where: { post_id: data },
            order: [["createdAt", "DESC"]],
        });
        console.log(result, "reasss");
        return result;
    },

    createRoom: async (sId, rId, data, type) => {
        let result;
        if (type === 'user') {
            // Logic for creating a user message
            result = await Message.create({
                sender_id: sId,
                receiver_id: rId,
                content: data,
                type: type
            });
        } else if (type === 'group') {
            // Logic for creating a group message
            result = await Message.create({
                sender_id: sId,
                group_id: rId,  // Note: rId is actually groupId when type is 'group'
                content: data,
                type: type
            });
        }
        console.log(result, "msg stored success in uH");
        return result;
    },

    createGroupRoom: async (sId, gId, data, type) => {
        const result = await GroupMessage.create({
            sender_id: sId,
            group_id: gId,
            content: data,
            type: type
        });
        console.log(result, "groupMessages created");
        return result;
    },

    allMessage: async (sId, rId, type) => {
        let data;
        if (type === "user") {
            data = await Message.findAll({
                where: {
                    type: "user",
                    [Op.or]: [
                        { sender_id: sId, receiver_id: rId },
                        { sender_id: rId, receiver_id: sId },
                    ],
                },
                order: [["createdAt", "ASC"]],
            });
        } else if (type === "group") {
            data = await Message.findAll({
                where: {
                    type: "group",
                    group_id: rId, // Here, rId represents the group ID
                },
                order: [["createdAt", "ASC"]],
            });
        }
        console.log(data, "makkale");
        return data;
    },
    allGroupMessages: async (id) => {
        const data = await GroupMessage.findAll({
            where: {
                group_id: id,
                order: [["createdAt", "ASC"]],
            },
        });
        console.log(data, "groupMessage helper");
        return data;
    },
    userFind: async (data, mail, userId) => {
        const result = await User.findAll({
            where: {
                status: data,
                email: {
                    [Op.ne]: mail,
                },
                [Op.and]: [
                    sequelize.literal(
                        `user_id NOT IN (SELECT receiver_id FROM "Connections" WHERE sender_id = ${userId} )`
                    ),
                ],
            },
        });
        console.log(result, "allUser");
        return result;
    },
    findId: async (data) => {
        const result = await User.findOne({ where: { user_id: data } });
        console.log(result, "result by receiver id ");
        return result;
    },
    findRequest: async (sId, rId) => {
        try {
            const request = await Connection.findOne({
                where: {
                    [Op.or]: [
                        { sender_id: sId, receiver_id: rId },
                        { sender_id: rId, receiver_id: sId },
                    ],
                },
            });
            return request;
        } catch (err) {
            console.log(err, "error on finding existing request");
        }
    },

    makeConnection: async (sId, rId) => {
        const connection = await Connection.create({
            sender_id: sId,
            receiver_id: rId,
            status: "pending",
        });
        console.log(connection, "makeconnctn");
        return connection;
    },
    existConnection: async (sId, rId) => {
        const connect = await Connection.findOne({
            where: {
                sender_id: sId,
                receiver_id: rId,
                status: "pending",
                notificationStatus: "unread",
            },
        });
        return connect;
    },
    accept: async (sId, rId) => {
        try {
            const update = await Connection.update(
                { status: "accepted", notificationStatus: "read" },
                { where: { sender_id: sId, receiver_id: rId, status: "pending" } }
            );
            return update;
        } catch (err) {
            console.log(err, "error on updating the status ");
        }
    },
    unwantedUser: async (sId, rId) => {
        try {
            const update = await Connection.update(
                { status: "rejected", notificationStatus: "read" },
                { where: { sender_id: sId, receiver_id: rId, status: "pending" } }
            );
            return update;
        } catch (err) {
            console.log(err, "error on updating the status ");
        }
    },
    connectedOne: async (id) => {
        try {
            const result = await Connection.findAll({
                where: {
                    status: "accepted",
                    [Op.or]: [{ sender_id: id }, { receiver_id: id }],
                },
                include: [
                    {
                        model: User,
                        as: "Sender",
                        attributes: ["name", "user_id"],
                    },
                    {
                        model: User,
                        as: "Receiver",
                        attributes: ["name", "user_id"],
                    },
                ],
            });
            return result.map((connection) => ({
                id: connection.id,
                profileName:
                    connection.sender_id === id
                        ? connection.Receiver.name
                        : connection.Sender.name,
                receiverId:
                    connection.sender_id === id
                        ? connection.Sender.user_id
                        : connection.Receiver.user_id,
                userId:
                    connection.receiver_id === id
                        ? connection.Sender.user_id
                        : connection.Receiver.user_id,
                type: "user",
            }));
        } catch (err) {
            console.log(err, "error fetching connected users");
        }
    },
    connectedGroup: async (id) => {
        try {
            const groupMembers = await GroupMember.findAll({
                where: { user_id: id },
                include: [
                    {
                        model: Group,
                        attributes: ["group_id", "groupName"],
                    },
                ],
            });

            return groupMembers.map((connection) => ({
                id: connection.Group.group_id,
                // userId:connection.,
                groupId: connection.Group.group_id,
                profileName: connection.Group.groupName,
                receiverId: connection.user_id,
                type: "group",
            }));
        } catch (err) {
            console.log(err, "error on finding connected groups");
        }
    },

    requestedOne: async (id) => {
        try {
            const result = await Connection.findAll({
                where: {
                    sender_id: id,
                    status: "pending",
                },
                include: [
                    {
                        model: User,
                        as: "Receiver",
                        attributes: ["name", "user_id"],
                    },
                ],
            });
            return result.map((connection) => ({
                id: connection.id,
                profileName: connection.Receiver.name,
                userId: connection.Receiver.user_id,
            }));
        } catch (err) {
            console.log(err, "error fetching requsted users");
        }
    },
    removing: async (sId, rId) => {
        try {
            const update = await Connection.update(
                { status: "removed" },
                { where: { sender_id: sId, receiver_id: rId, status: "accepted" } }
            );
            return update;
        } catch (err) {
            console.log(err, "error on updating the status ");
        }
    },
    getConnectionById: async (cId) => {
        try {
            const connection = await Connection.findAll({
                where: { id: cId },
                include: [
                    {
                        model: User,
                        as: "Sender",
                        attributes: ["user_id"],
                    },
                    {
                        model: User,
                        as: "Receiver",
                        attributes: ["user_id"],
                    },
                ],
            });

            if (!connection) {
                throw new Error("Connection not found");
            }
            console.log(connection, "aassskdkdkdkdk");
            const userIds = new Set();
            connection.forEach((connections) => {
                userIds.add(connections.sender_id);
                userIds.add(connections.receiver_id);
            });
            return Array.from(userIds);
        } catch (err) {
            console.log(err, "Error fetching user_id for connection");
            throw err;
        }
    },
    removeMember: async (gId, uId) => {
        const result = await GroupMember.destroy({
            where: { group_id: gId, user_id: uId },
        });
        return result;
    },

    getGroupMembers: async (gId) => {
        const members = await GroupMember.findAll({ where: { group_id: gId } });
        return members;
    },
    deleteGroup: async (gId) => {
        const admin = await Group.destroy({ where: { group_id: gId } });
        return admin;
    },
    updateAdmin: async (gId, uId) => {
        const updatedGroup = await Group.update(
            { admin: uId },
            {
                where: { group_id: gId },
            }
        );
        return updatedGroup;
    },
    groupMembers: async (gId) => {
        try {

            const group = await Group.findOne({
                where: {
                    group_id: gId
                },
                include: [{
                    model: User,
                    attributes: ['name'],
                    as: 'adminUser'
                }]
            });
            const members = await GroupMember.findAll({
                where: {
                    group_id: gId
                },
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            })
            const groupData = {
                groupName: group.groupName,
                admin: {
                    user_id: group.admin,
                    name: group.adminUser.name,
                },
                members: members.map(member => ({
                    user_id: member.user_id,
                    name: member.User.name
                }))
            };

            console.log(groupData, 'group data with admin and members');
            return groupData;
        } catch (err) {
            console.log(err, 'error while viewing members in grop');

        }

    },
    viewIndividualPosts: async (rId) => {
        try {
            const post = await UserPost.findAll({
                where: {
                    user_id: rId
                }
            })
            return post

        } catch (err) {
            console.log(err, 'error while viewing the posts of individual users');

        }
    },
    countConnection: async (uId) => {

        try {
            const count = await Connection.count({
                where: {
                    status: 'accepted',
                    [Op.or]: [
                        { sender_id: uId },
                        { receiver_id: uId }
                    ]
                }
            });
            return count;
        } catch (error) {
            console.log('Error counting connections:', error);
            throw error;
        }
    },
    groupsAvailable: async (uId) => {
        const result = await GroupMember.findAll({
            where:
                { user_id: uId },
            include: [
                {
                    model: Group,
                    attributes: ['groupName']

                }]
        })
        console.log(result, 'result result')
        const groups = result.map(member => ({
            groupId: member.Group.groupId,
            groupName: member.Group.groupName
        }));
        return groups
    }
};
