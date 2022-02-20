const express = require('express');
const controller = require('../controller/userCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.get('/',controller.alluser)
router.get('/searchuser',auth ,controller.search)
router.post('/',controller.sign)
router.post('/login', controller.login)
router.put('/',auth ,controller.updateuser)
module.exports = router;