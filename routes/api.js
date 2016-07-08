'use strict';

const express = require('express');

let router = express.Router();

router.use('/users', require('./users'));
router.use('/wallposts', require('./wallposts'));

module.exports = router;
