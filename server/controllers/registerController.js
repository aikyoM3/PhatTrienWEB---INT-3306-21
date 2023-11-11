const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const createNewAccount = asyncHandler(async (req, res) => {
    console.log('Request Body:', req.body);
    res.header('Content-Type', 'application/json');

    const { username, password,role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required ' });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            role,
        });
        res.status(201).json({ message: 'New User' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid user data' });
    }
});

module.exports = { createNewAccount };
