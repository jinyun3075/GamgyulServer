const express = require('express');
const controller = require('../controller/productCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.post('/', auth, controller.register);

module.exports = router;