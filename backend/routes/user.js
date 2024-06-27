const express = require('express');
const router = express.Router();

const{signup, verifyEmail}=require('../controllers/userController')

router.post('/signup',signup)
router.post('/verify',verifyEmail)
module.exports = router;
