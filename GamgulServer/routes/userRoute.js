const express = require('express');
const controller = require('../controller/userCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.post('/',controller.sign)
router.post('/login', controller.login)
module.exports = router;