const express = require('express');
const controller = require('../controller/postCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.get('/feed', auth, controller.feed);
router.get('/:accountname/userpost', auth, controller.getMyList);
router.post('/', auth, controller.create);

module.exports = router;