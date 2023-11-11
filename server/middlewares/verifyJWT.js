const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = decoded.UserInfor.username
            req.role = decoded.UserInfor.role
            next();
        }
    )
});

module.exports = {verifyJWT};