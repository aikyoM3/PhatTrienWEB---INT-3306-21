const express = require('express');
const router = express.Router();
const {createNewAccount} = require('../controllers/registerController');

router.post('/', createNewAccount);

module.exports = router;
