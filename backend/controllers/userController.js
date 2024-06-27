const User=require('../models/Users')
const verification= require('../config/otp')
const UnverifiedUser=require('../models/Unverified')
const bcrypt= require ('bcrypt')
const jwt=require('jsonwebtoken')
module.exports={
    signup:async(req,res)=>{
        console.log(req.body)
        if(!req.body.email || !req.body.name || !req.body.password){
            return res.status(400).json({error:'Missing required fields'})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            isActive: false
        };
        console.log(userData,'aa');

        try {
            const existUser = await User.findOne({ where: { email: userData.email } });
            console.log(existUser,'ss');
            if (existUser) {
                return res.status(400).json({ error: 'User already exists' });
            } 
            console.log('111');

             const existUnverifiedUser = await UnverifiedUser.findOne({ where: { email: userData.email } });
            console.log(existUnverifiedUser,'kk');
            if (existUnverifiedUser) {
                return res.status(400).json({ error: 'Verification already in process' });
            }

            // Generate verification token
            const token = verification.generateVerificationToken(userData.email);
            console.log(token,'tokekn');

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
    verifyEmail:async(req,res)=>{
        const token=req.query.token
        console.log(token,'lll');
        if (!token) {
            return res.status(400).json({ error: 'Missing token' });
        }
        try{
            const decoded= jwt.verify(token,process.env.SECRET_KEY)
            console.log(decoded,'okk');
            const email=decoded.email
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
            console.log(userData);

            await User.create(userData);
            console.log('4545');
            await UnverifiedUser.destroy({ where: { email: unverifiedUser.email } });
            return res.status(200).json({ message: 'Email verified successfully' });
        } catch (err) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    }
}