const express = require('express');
const router = express.Router();
const isAuth= require('../middlewares/isAuth')

const{signup, verifyEmail,loginUser,userPost, userStatus}=require('../controllers/userController')

router.post('/signup',signup)
router.post('/verify',verifyEmail)
router.get('/verify',verifyEmail)
router.post('/login',loginUser)
router.post('/createPost',userPost)
router.post('/setStatus',userStatus)

module.exports = router;
