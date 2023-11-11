const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const handleLogin = asyncHandler(async (req, res) => {
    const { username, password,role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser = await User.findOne({ username }).lean().exec();
    const match = await bcrypt.compare(password, foundUser.password);
    if (foundUser) {
        if (match) {
            const accessToken = jwt.sign(
                { 
                    username: foundUser.username,
                    role
                }, 
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1h'}
            ); 
            const refreshToken = jwt.sign(
                { 
                    username: foundUser.username,
                    role
                }, 
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '2h'}
            );

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            
            })
            res.status(200).json(
                { 
                    message: 'Login Success',
                    accessToken:  accessToken
                });
        } else {
            res.status(400).json({ message: 'Password not match' });
        }
    } else {
        res.json({ message: 'Username not found' })
    }
});

const handleLogout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    res.json({ message: 'Cookie cleared' });
}
module.exports = { 
    handleLogin,
    handleLogout
};