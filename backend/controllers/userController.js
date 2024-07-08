const User = require('../models/Users')
const verification = require('../config/otp')
const UnverifiedUser = require('../models/Unverified')
const { token } = require('../utils/jwt')
const bcrypt = require('bcrypt')
const uHelpers = require('../helpers/userHelper')
const jwt = require('jsonwebtoken')
const UserPost = require('../models/UserPost')
const Group = require('../models/Group')
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
            // const user_id=user.user_id;
            // console.log(user_id,'uer');
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const Token = token(email, user.role,user_id)
                console.log(Token);
                return res.status(200).json({ message: 'user loggedIn', role: 'user', token: Token })
            } else {
                return res.status(400).json({ message: 'Invalid password' })
            }

        } catch (error) {
            return res.status(404).json({ message: 'unexpected error' })

        }
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
        const { name, image } = req.body;
        const user_id =req.user.user_id
        // console.log(user_id);
        // console.log(req.user.user_id);
        // console.log(req.user,'aaaaaaa');

        const creation = await uHelpers.gCreation(name, image,user_id)
        console.log(creation);


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
        console.log(req.body,'jjjjj');
        const {groupId} = req.body
        // console.log(req.body)
        const userId=req.user.user_id
        console.log(userId);
        const existMember= await uHelpers.findGroup(groupId,userId)
        


    }

}