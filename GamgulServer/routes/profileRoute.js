const express = require('express');
const controller = require('../controller/profileCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.get('/:accountname', auth, controller.preprofile);
router.post('/:accountname/follow', auth, controller.follow);
router.delete('/:accountname/unfollow', auth, controller.unfollow);
module.exports = router;