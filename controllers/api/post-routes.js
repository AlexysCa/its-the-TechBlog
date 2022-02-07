const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const {User, Post, Comment} = require('../../models');
const authenticate = require('../../utils/authenticate');

// gets all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username'],
                }
            }
        ]
    })
    .then((postData) => res.json(postData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

// gets one post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [{
            model: User,
            attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username'],
                }
            }
        ]
    })
    .then((postData) => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id'})
            return;
        }
        res.json(postData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

// creates a post 
router.post('/', authenticate, (req, res) => {
    console.log('Post is being created');
    Post.create({
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then((postData) => res.json(postData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

// should update a post that was created 
router.put('/:id', authenticate, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.post_content,
    },
    {
        where: {
            id: req.params.id,
        },   
    })
    .then((postData) => {
        if (!postData) {
            res.status(404).json({ message: 'No post would with that id'});
            return;
        }
        res.json(postData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

// should delete a post that was created
router.delete('/:id', authenticate, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        }
    })
    .then((postData) => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id'});
            return;
        }
        res.json(postData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;