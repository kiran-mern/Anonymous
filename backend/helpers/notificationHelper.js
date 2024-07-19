const Comments = require("../models/Comments");
const Connection = require("../models/Connection");
const Like = require("../models/Likes");
const UserPost = require("../models/UserPost");
const User = require('../models/Users')
const { Op, Sequelize } = require('sequelize');


module.exports = {
    fetchRecentLikes: async (userId) => {
        try {
            const likes = await Like.findAll({
                where: { user_id: userId },
                include: [{
                    model: User,
                    attributes: ['name']
                },
                {
                    model: UserPost,
                    where: { user_id: userId }
                }],
                order: [['createdAt', 'DESC']],
                limit: 10
            })
            console.log(likes, 'likes');
            return likes

        } catch (err) {
            console.log(err, 'error on likes finding');

        }
    },
    fetchRecentComments: async (userId) => {
        try {
            const comments = await Comments.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: UserPost,
                        attributes: ['post_id', 'content'], // Include post details
                        where: { user_id: userId }
                    }
                ],
                order: [['createdAt', 'DESC']],
                
                limit: 10
            });

            // Group the comments by post_id and get the latest one for each post
            const groupedComments = comments.reduce((acc, comment) => {
                if (!acc[comment.post_id]) {
                    acc[comment.post_id] = comment;
                }
                return acc;
            }, {});

            // Format the results
            const formattedComments = Object.values(groupedComments).map(comment => ({
                type: 'comments',
                message: `${comment.User.name} commented on your post "${comment.UserPost.content}"`,
                createdAt: comment.createdAt,
                postId: comment.UserPost.post_id,
                user: comment.User.name ,// Include the user object for consistency
                content:comment.UserPost.content
            }));

            console.log(formattedComments, 'formatted comments');
            return formattedComments;
        } catch (err) {
            console.log(err, 'error on comments finding');
            return [];
        }
    },
    fetchRecentConnection: async (userId) => {
        try {
            const connect = await Connection.findAll({
                include: [{
                    model: User,
                    as: 'Sender',
                    attributes: ['name']
                }],

                where: { receiver_id: userId },
                order: [['createdAt', 'DESC']],
                limit: 10
            });
            console.log(connect, 'connect');
            return connect;

        } catch (err) {
            console.log(err, 'error on connection finding');

        }

    },
    fetchAcceptedConnection: async (userId) => {
        try {
            const accepted = await Connection.findAll({
                include: [{
                    model: User,
                    as: 'Receiver',
                    attributes: ['name']
                }],

                where: { sender_id: userId, status: 'accepted' },
                order: [['createdAt', 'DESC']],
                limit: 10
            })
            console.log(accepted, 'accepted');
            return accepted
        }
        catch (err) {
            console.log(err, 'error while fetching accept notificaton');
        }

    }
}