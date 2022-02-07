const router = require('express').Router();

// variables for routes
const userRout = require('./user-routes');
const postRout = require('./post-routes');
const commentRout = require('./comment-routes');

router.use('/users', userRout);
router.use('/posts', postRout);
router.use('/comments', commentRout);

module.exports = router;