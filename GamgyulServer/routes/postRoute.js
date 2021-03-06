const express = require('express');
const controller = require('../controller/postCont');
const router = express.Router();
const auth = require('../midd/Auth');

router.get('/feed', auth, controller.feed);
router.get('/:accountname/userpost', auth, controller.getMyList);

router.post('/:post_id/heart', auth, controller.heart);
router.delete('/:post_id/unheart', auth, controller.unheart);

router.post('/', auth, controller.create);
router.get('/:post_id', auth, controller.view);
router.put('/:post_id', auth, controller.update);
router.delete('/:post_id', auth, controller.deletePost);

router.get('/:post_id/comments', auth, controller.commentList)
router.post('/:post_id/comments', auth, controller.comment)
router.delete('/:post_id/comments/:comment_id', auth, controller.deleteComment)

module.exports = router;