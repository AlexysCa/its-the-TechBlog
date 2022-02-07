const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const {User, Post, Comment} = require('../../models');
const authenticate = require('../../utils/authenticate');

// gets all comments 
router.get('/', (req, res) => {
    Comment.findAll()
    .then((commentData) => res.json(commentData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

// should create a comment
router.post('/', authenticate, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
})

module.exports = router; 