const express = require('express');
const controller = require('../controller/profileCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.get('/:accountname', auth, controller.preprofile)

module.exports = router;