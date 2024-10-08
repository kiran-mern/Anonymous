const User = require('../models/Users')
const verification = require('../config/otp')
const UnverifiedUser = require('../models/Unverified')
const { token } = require('../utils/jwt')
const bcrypt = require('bcrypt')
const uHelpers = require('../helpers/userHelper')
const jwt = require('jsonwebtoken')
const UserPost = require('../models/UserPost')
const Group = require('../models/Group')
const { all } = require('../routes')
module.exports = {
    signup: async (req, res) => {
        console.log(req.body)
        if (!req.body.email || !req.body.name || !req.body.password) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            isActive: false
        };
        // console.log(userData, 'aa');

        try {
            const existUser = await User.findOne({ where: { email: userData.email } });
            console.log(existUser, 'ss');
            if (existUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            // console.log('111');

            const existUnverifiedUser = await UnverifiedUser.findOne({ where: { email: userData.email } });
            console.log(existUnverifiedUser, 'kk');
            if (existUnverifiedUser) {
                return res.status(400).json({ error: 'Verification already in process' });
            }

            // Generate verification token
            const token = verification.generateVerificationToken(userData.email);
            // console.log(token, 'tokekn');

            // Save unverified user datall
            await UnverifiedUser.create({
                ...userData,
                token: token
            });

            // Send verification email
            await verification.sendVerificationEmail(userData.email, token);

            return res.status(200).json({ message: 'Verification email sent' });
        } catch (err) {
            return res.status(500).json({ error: 'An error occurred' });
        }

    },
    verifyEmail: async (req, res) => {
        const token = req.query.token
        console.log(token, 'lll');
        if (!token) {
            return res.status(400).json({ error: 'Missing token' });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // console.log(decoded, 'okk');
            const email = decoded.email
            const unverifiedUser = await UnverifiedUser.findOne({ where: { email, token } });
            if (!unverifiedUser) {
                return res.status(400).json({ error: 'Invalid or expired token' });
            }

            // Move user data from UnverifiedUser to User
            const userData = {
                email: unverifiedUser.email,
                name: unverifiedUser.name,
                password: unverifiedUser.password,
                isActive: true
            };
            // console.log(userData);

            await User.create(userData);
            console.log('4545');
            await UnverifiedUser.destroy({ where: { email: unverifiedUser.email } });
            // await verification.sendVerificationEmail(email)
            return res.status(200).json({ message: 'Email verified successfully' });
        } catch (err) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            // console.log(req.body,'body');
            const user = await User.findOne({ where: { email } })
            // console.log(user,'user');
            const user_id = user.user_id;
            // console.log(user_id,'uer');
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const Token = token(email, user.role, user_id)
                console.log(Token);
                return res.status(200).json({ message: 'user loggedIn', role: 'user', user_id,token: Token })
            } else {
                return res.status(400).json({ message: 'Invalid password' })
            }

        } catch (error) {
            return res.status(404).json({ message: 'unexpected error' })

        }
    },
    home: async (req, res) => {
        const userId= req.user.user_id;
        const posts = await uHelpers.viewAll(userId)
        console.log(posts, 'post');
        return res.status(200).json({ message: 'home page', data: posts })


    },
    userPost: async (req, res) => {
        try {
            const { token, content } = req.body
            // console.log(req.body);
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // console.log(decoded, 'okk');
            const email = decoded.email
            const user = await User.findOne({ where: { email } })
            // console.log(user, 'user');
            const user_id = user.user_id
            // console.log(user_id);
            if (!user_id || !content) {
                return res.status(400).json({ message: 'field is missing' })
            }
            const newPost = await UserPost.create({ user_id, content })
            return res.status(200).json({ message: 'created ', newPost })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });


        }
    },

    userStatus: async (req, res) => {
        try {
            const { email } = req.user
            const { feeling } = req.body
            // console.log(feeling, 'aacc');
            // const user = await User.findOne({ where: { email } })
            // console.log(user.status);
            const ab = await uHelpers.setStatus(email, feeling)
            // console.log(ab, 'aa');
        } catch (err) {
            console.log(err);
        }
    },
    groupCreation: async (req, res) => {
        const { name, image ,selectedMembers} = req.body;
        console.log(req.body,'bofybofhd');
        const creator = req.user.user_id
        try{
            const creation = await uHelpers.gCreation(name, image, creator)
            console.log(creation,'creation');
            const groupId=creation.group_id;
            console.log(groupId,'a');

            const userIdsToAdd= new Set([creator]);

            if(selectedMembers&& selectedMembers.length>0){
                const membersUserId= await uHelpers.getConnectionById(selectedMembers)

                membersUserId.forEach(id=>userIdsToAdd.add(id))
            }
            await Promise.all([...userIdsToAdd].map(userId=>
            uHelpers.addMembers(groupId,userId)))
            return res.status(200).json({message:'created successfully',creation})

        }catch(err){
            console.log(err,'error when creating and adding users to groups');
        }
    },
    deactivate: async (req, res) => {
        const { email } = req.user
        const { onConfirm } = req.body

        const user = await uHelpers.findUser(email)
        console.log(user, 'user')
        const deactivate = await uHelpers.isActive(email)
        return res.status(200).json({ message: 'deactivated', onConfirm })
    },
    availableGroups: async (req, res) => {
        const data = await Group.findAll({})
        console.log('look', data);
        return res.status(200).json({ message: 'available groups', data })

    },
    groupJoin: async (req, res) => {
        try {
            // console.log(req.body, 'jjjjj');
            const { groupId } = req.body
            // console.log(req.body)
            const userId = req.user.user_id
            // console.log(userId);

            //          finishing touch


            // const existMember = await uHelpers.findGroup(groupId, userId)
            // if (existMember) {
            //     return res.status(400).json({ message: 'already a member in the group' })
            // }
            const joinGroup = await uHelpers.addMembers(groupId, userId)
            console.log(joinGroup, 'join');
            return res.status(200).json({ message: 'User added to the group', joinGroup })
        } catch (err) {
            console.log('error while joing group');
            return res.status(400).json({ message: 'internal server error' })
        }
    },
    likePosts: async (req, res) => {
        try {
            const{post_id}=req.body
            // const { post_id, user_id } = req.body

            console.log(req.body);
            const user_id=req.user.user_id;
            let data, message;
            const existingLikes = await uHelpers.findLike(post_id, user_id)
            console.log(existingLikes);
            if (existingLikes) {
                data = await uHelpers.dLike(post_id, user_id);
                message = 'Post unliked successfully'
            } else {

                data = await uHelpers.like(post_id, user_id);
                message = 'Liked the post'
            };
            const likeCount = await uHelpers.countLikes(post_id)
            console.log(likeCount,'popo');
            return res.status(200).json({ message, data, likeCount })



        } catch (err) {
            console.log('Error on like posts', err);
            return res.status(400).json({ message: 'error on like posts' })

        }


    },
    postComments: async (req, res) => {
        try {
            // const { post_id, user_id, content } = req.body;
            console.log(req.body);
            const{post_id,content}=req.body

            const user_id=req.user.user_id;
            const data = await uHelpers.addComment(post_id, user_id, content);
            const commentCount=await uHelpers.countComment(post_id)
            console.log(commentCount,'co,');
            return res.status(200).json({ message: 'comments added', data,commentCount })
        }
        catch (err) {
            console.log('Error on comment section', err);
            return res.status(400).json({ message: 'error on comment section' })
        }
    },
    getComments: async (req, res) => {
        try {
            // console.log(req.query);
            const post_id= req.query.post_id
            // console.log(post_id,'kk')
            const data = await uHelpers.getComments(post_id)
            const commentsCount= data.length
            return res.status(200).json({ message: 'view comments', data,commentsCount })
        }
        catch (err) {
            console.log(err, 'error while view comments');
            return res.status(400).json({ message: 'failed request to view comment', err })
        }
    },
    postChat:async(req,res)=>{
        const {sender_id,receiver_id,content,type,group_id}= req.body
        console.log(req.body,'varyo');
        let chat;
        try{
            if(type==='user'){
                 chat= await uHelpers.createRoom(sender_id, receiver_id,content,type)
            }else if(type==='group'){
                chat=await uHelpers.createRoom(sender_id,group_id,content,type)

            }
            return res.status(200).json({message:'message stored in db',chat})
               
        }
        catch(err){
            console.log('error on storing msg in db',err);

        }

    },
    getChat:async(req,res)=>{
        const senderId=req.user.user_id
        const {receiverId,type}= req.query
       
        console.log(senderId,receiverId,type,'aaa')
        let chat;
        try{
            if(type==='group'){
                 chat= await uHelpers.allMessage(senderId,receiverId,type)
            }
            else if (type==='user'){
                 chat= await uHelpers.allMessage(senderId,receiverId,type)
            }
            console.log(chat,'vgfg');
            return res.status(200).json({message:'messages',chat})
        }
        catch(err){
            console.log('error on showing messages',err);

        }
    },
    findConnections:async(req,res)=>{
        try{
        const email= req.user.email
        const user= await uHelpers.findUser(email)
        const status=user.status
        console.log(status,'aap');
        const findConnect= await uHelpers.userFind(status,email,user.user_id)
        return res.status(200).json({message:'all users for connection',findConnect})
        }
        catch(err){
            console.log(err,'error while finding new connections');
            return res.status(400).json({message:'No available users '})
        }
    },
    sendRequest:async(req,res)=>{
        const senderId= req.user.user_id
       const {receiverId}=req.body
       console.log(receiverId,'asdssd');
       try{
        const receiver= await uHelpers.findId(receiverId)

        if(!receiver){
            return res.status(404).json({message:'Receiver not found'})
        }
        const existingRequest= await uHelpers.findRequest(senderId,receiverId)
        if(existingRequest){
            return res.status(400).json({message:'Connction request already exist'})
        }
        const connectRequest= await uHelpers.makeConnection(senderId,receiverId)
        return res.status(200).json({message:'connection request sent',connectRequest})
       }
       catch(err){
        console.log('Error sending connection request:', err);
        return res.status(500).json({ message: 'Internal server error' });
       }
    },
    acceptRequest:async(req,res)=>{
        const receiverId=req.user.user_id;
        const {requestId}= req.body;
        // console.log(req.body,'body');
        try{
            const connectionRequest= await uHelpers.existConnection(requestId,receiverId)
            if (!connectionRequest) {
                return res.status(404).json({ message: 'Connection request not found' });
            }
            const updated= await uHelpers.accept(requestId,receiverId)
            console.log(updated,'updated status');
            return res.status(200).json({message:'connction accepted'})
        }
        catch(err){
            console.log(err,'error on accept request');
            return res.status(500).json({message:'Internal server error'})
        }
    },
    cancelRequest:async(req,res)=>{
        const receiverId=req.user.user_id;
        const {requestId}= req.body;
        try{
            const connectionRequest=await uHelpers.existConnection(requestId,receiverId)
            if(!connectionRequest){
                return res.status(400).json({message:'connction request not found'})
            }
            const reject= await uHelpers.unwantedUser(requestId,receiverId)
            return res.status(200).json({message:'Rejected from the requested list'})
        }
        catch(err){
            console.log(err,'error on cancelling request');
            return res.status(500).json({message:'Internal server error'})
        }
    },
    connectedMessage:async(req,res)=>{
        const userId=req.user.user_id;
        try{
            const connectedUsers= await uHelpers.connectedOne(userId)
            const connectedGroups= await uHelpers.connectedGroup(userId)
            console.log(connectedUsers,connectedGroups,'shabmo');
            return res.status(200).json({message:'fetching conncted users',connectedUsers,connectedGroups})
        }
        catch(err){
            console.log(err,'error fetching connected users ');
            return res.status(500).json({message:'Internal error'})
        }
    },
    requestedMessage:async(req,res)=>{
        const userId= req.user.user_id
        try{
            const requested= await uHelpers.requestedOne(userId)
            return res.status(200).json({message:'fetching requested users',requested})
        }
        catch(err){
            console.log(err,'error fetching requested users');
            return res.status(500).json({message:'Internal error'})
        }
    },
    disconnectUser:async(req,res)=>{
        const userId=req.user.user_id;
        const {receiverId}=req.body
        console.log(req.body,'body');
        // const {receiverId}=req.body
        try{
            // const find=await uHelpers.connectedOne(userId)
            const connect= await uHelpers.findRequest(userId,receiverId)
            console.log(connect,'status');
            if(connect.status=='accepted'){
                const remove=await uHelpers.removing(userId,receiverId)
                return res.status(200).json({message:'removed successfully'})
            }else if(connect.status=='pending'){
                const remove= await uHelpers.unwantedUser(userId,receiverId)
                return res.status(200).json({message:'removed successfully'})
            }

        }catch(err){
            console.log(err,'error while removing the connected user');
        }
    },
    leaveGroup:async(req,res)=>{
        const {groupId}=req.body
        const userId= req.user.user_id;

        try{
            await uHelpers.removeMember(groupId,userId)
            const group= await uHelpers.findGroup(groupId)
            if(group.admin==userId){
                const remainingMembers=await uHelpers.getGroupMembers(groupId)
                if(remainingMembers.length > 0){
                    const newAdmin=remainingMembers[0].user_id;
                    await uHelpers.updateAdmin(groupId,newAdmin)
                }else{
                    await uHelpers.deleteGroup(groupId)
                }
            }
            return res.status(200).json({ message: 'Left the group successfully' });
        }
        catch(err){
            console.log(err,'error while leave from the group');
        }
    },
    viewMembers:async(req,res)=>{
        const {groupId}=req.query
        const userId= req.user.user_id;
        console.log(groupId,userId,'basics needed');
        try{
            const members=await uHelpers.groupMembers(groupId)
            console.log(members,'kiran');
            return res.status(200).json({message:'fetching group members successfully ', members})

        }catch(err){
            console.log(err,'error while fetching group members');
        }
    },
    viewById:async(req,res)=>{
        try{
            const userId= req.user.user_id;
            const {receiverId}=req.query;
            console.log(req.query,'bofy');
            const viewPost=await uHelpers.viewIndividualPosts(receiverId)
            const user=await uHelpers.findId(receiverId)
            console.log(viewPost,user,'viewPost');
            const connectionCount=await uHelpers.countConnection(userId)
            return res.status(200).json({message:'fetching  all posts successfully',viewPost,user,connectionCount})
        }
        catch(err){
            console.log(err,'error while fething individual posts ')
        }
    },
    currentGroups:async(req,res)=>{
        const user_id=req.user.user_id;
        console.log('dfghjk',user_id);
        const group=await uHelpers.connectedGroup(user_id)
        return res.status(200).json({message:'all groups for members',group})

    }

    


}