const express = require('express');
const router = express.Router();
const isAuth= require('../middlewares/isAuth')

const{signup, verifyEmail,loginUser,userPost,postChat,sendRequest,acceptRequest,findConnections,getChat,home,likePosts,getComments, postComments, userStatus,groupJoin,groupCreation,deactivate,availableGroups}=require('../controllers/userController')

router.post('/signup',signup)
router.post('/verify',verifyEmail)
router.get('/verify',verifyEmail)
router.get('/home',isAuth,home)
router.post('/login',loginUser)
router.post('/createPost',userPost)
router.post('/setStatus',isAuth,userStatus)
router.post('/createGroup',isAuth,groupCreation)
router.post('/deactivate',isAuth,deactivate)
router.get('/allGroups',isAuth,availableGroups)
router.post('/joinGroup',isAuth,groupJoin)
router.post('/likes',isAuth,likePosts)
router.post('/comments',isAuth,postComments)
router.get('/allComments',getComments)
router.post('/chat',isAuth,postChat)
router.get('/allMessage',isAuth,getChat)
router.get('/newConnections',isAuth,findConnections)
router.post('/connect',isAuth,sendRequest)
router.post('/accept',isAuth,acceptRequest)

module.exports = router;
