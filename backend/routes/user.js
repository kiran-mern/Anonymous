const express = require('express');
const router = express.Router();

const{signup, verifyEmail,loginUser,userPost}=require('../controllers/userController')

router.post('/signup',signup)
router.post('/verify',verifyEmail)
router.get('/verify',verifyEmail)
router.post('/login',loginUser)
router.post('/createPost',userPost)

module.exports = router;
