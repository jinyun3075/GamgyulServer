const express = require('express');
const controller = require('../controller/userCont');
const router = express.Router();

router.post('/',controller.sign)

module.exports = router;