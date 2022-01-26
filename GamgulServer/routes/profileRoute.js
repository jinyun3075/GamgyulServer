const express = require('express');
const controller = require('../controller/profileCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.get('/:accountname', auth, controller.preprofile);
router.get('/:accountname/following', auth, controller.followingList);
router.get('/:accountname/follower', auth, controller.followerList);
router.post('/:accountname/follow', auth, controller.follow);
router.delete('/:accountname/unfollow', auth, controller.unfollow);
module.exports = router;