const express = require('express');
const router = express.Router();

const{signup, verifyEmail,loginUser}=require('../controllers/userController')

router.post('/signup',signup)
router.post('/verify',verifyEmail)
router.get('/verify',verifyEmail)
router.post('/login',loginUser)

module.exports = router;
